// Configuración por servidor y prefijos únicos por canal (configurables por comando)

import { prisma } from "@aotr/db";
import { DEFAULTS } from "../config/constants.js";

const cache = new Map(); // guildId -> config
const TTL = 30_000; // 30s

export async function getGuildConfig(guildId, { force = false } = {}) {
  const hit = cache.get(guildId);
  if (!force && hit && Date.now() - hit.fetchedAt < TTL) return hit;

  const config = await prisma.guildConfig.upsert({
    where: { guildId },
    create: { guildId },
    update: {},
    include: { channels: true }
  });

  const result = { ...config, fetchedAt: Date.now() };
  cache.set(guildId, result);
  return result;
}

export async function invalidateGuildConfig(guildId) {
  cache.delete(guildId);
}

export function prefixFromConfig(config, channelId) {
  if (!config) return DEFAULTS.prefix;
  const channel = config.channels?.find((c) => c.channelId === channelId);
  return channel?.prefix ?? config.defaultPrefix ?? DEFAULTS.prefix;
}

export async function resolvePrefix(guildId, channelId) {
  if (!guildId) return DEFAULTS.prefix;
  const config = await getGuildConfig(guildId);
  return prefixFromConfig(config, channelId);
}

export async function setChannelRole(guildId, channelId, role) {
  const config = await getGuildConfig(guildId, { force: true });
  await prisma.guildConfig.update({
    where: { guildId },
    data:
      role === "official"
        ? { officialChannelId: channelId }
        : role === "trade"
          ? { tradeChannelId: channelId }
          : {}
  });

  await prisma.channelConfig.upsert({
    where: { guildId_channelId: { guildId, channelId } },
    create: { guildId, channelId, role },
    update: { role }
  });

  await invalidateGuildConfig(guildId);
  return role;
}

export async function setChannelPrefix(guildId, channelId, prefix) {
  await prisma.channelConfig.upsert({
    where: { guildId_channelId: { guildId, channelId } },
    create: { guildId, channelId, prefix },
    update: { prefix }
  });

  await invalidateGuildConfig(guildId);
}

export async function setDefaultPrefix(guildId, prefix) {
  await prisma.guildConfig.update({
    where: { guildId },
    data: { defaultPrefix: prefix }
  });
  await invalidateGuildConfig(guildId);
}

export function channelRoleOf(config, channelId) {
  const channel = config.channels.find((c) => c.channelId === channelId);
  return channel?.role ?? null;
}

// ── Canal de bienvenidas ──────────────────────────────────
// Se guarda por servidor; si no está configurado se usa el fallback de env.
export function welcomeChannelOf(config, fallback = null) {
  return config?.welcomeChannelId ?? fallback;
}

export async function setWelcomeChannel(guildId, channelId) {
  await prisma.guildConfig.update({
    where: { guildId },
    data: { welcomeChannelId: channelId }
  });
  await invalidateGuildConfig(guildId);
}

export async function clearWelcomeChannel(guildId) {
  await prisma.guildConfig.update({
    where: { guildId },
    data: { welcomeChannelId: null }
  });
  await invalidateGuildConfig(guildId);
}
