// Definición de comandos slash
import { SlashCommandBuilder } from "discord.js";

export const COMMANDS = [
  new SlashCommandBuilder()
    .setName("valor")
    .setDescription("Consulta el valor de un item (oficial + tradeo)")
    .addStringOption((o) =>
      o.setName("item").setDescription("Nombre del item").setRequired(true).setAutocomplete(true)
    ),

  new SlashCommandBuilder()
    .setName("suma")
    .setDescription("Suma el valor de varios items (ej: item1 + item2 + item3)")
    .addStringOption((o) =>
      o.setName("items").setDescription("Items separados por +").setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("trade")
    .setDescription("Compara dos ofertas (ej: item1 for item2)")
    .addStringOption((o) =>
      o.setName("oferta").setDescription("Tu oferta").setRequired(true).setAutocomplete(true)
    )
    .addStringOption((o) =>
      o.setName("peticion").setDescription("Su oferta").setRequired(true).setAutocomplete(true)
    ),

  new SlashCommandBuilder()
    .setName("similares")
    .setDescription("Encuentra items con valor similar")
    .addStringOption((o) =>
      o.setName("item").setDescription("Item de referencia").setRequired(true).setAutocomplete(true)
    )
    .addIntegerOption((o) =>
      o.setName("porcentaje").setDescription("Rango ±% (default 10)").setMinValue(5).setMaxValue(30)
    ),

  new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Consulta la wiki de perks")
    .addStringOption((o) =>
      o.setName("perk").setDescription("Nombre de la perk").setRequired(true).setAutocomplete(true)
    ),

  new SlashCommandBuilder()
    .setName("sorteo")
    .setDescription("Crea un sorteo (solo administradores)")
    .addStringOption((o) =>
      o.setName("duracion").setDescription("Ej: 10m, 2h, 1d").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("premio").setDescription("Premio del sorteo").setRequired(true)
    )
    .addIntegerOption((o) =>
      o.setName("ganadores").setDescription("Cantidad de ganadores (default 1)").setMinValue(1)
    ),

  new SlashCommandBuilder()
    .setName("participantes")
    .setDescription("Muestra los participantes de los sorteos activos (solo administradores)"),

  new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configura canales de precios y prefijos (solo administradores)")
    .addSubcommand((s) =>
      s
        .setName("canal")
        .setDescription("Asigna el rol de un canal (oficial o trade)")
        .addChannelOption((o) =>
          o.setName("canal").setDescription("Canal a configurar").setRequired(true)
        )
        .addStringOption((o) =>
          o
            .setName("rol")
            .setDescription("Rol del canal")
            .setRequired(true)
            .addChoices(
              { name: "🟢 Oficial (hoja AOTR)", value: "official" },
              { name: "🔵 Trade (API)", value: "trade" }
            )
        )
    )
    .addSubcommand((s) =>
      s
        .setName("prefijo")
        .setDescription("Cambia el prefijo del bot (global o por canal)")
        .addStringOption((o) =>
          o.setName("prefijo").setDescription("Ej: ! o . o aotr!").setRequired(true)
        )
        .addChannelOption((o) =>
          o.setName("canal").setDescription("Canal específico (opcional)").setRequired(false)
        )
    )
    .addSubcommand((s) => s.setName("ver").setDescription("Muestra la configuración actual")),

  new SlashCommandBuilder()
    .setName("sync")
    .setDescription("Sincroniza precios manualmente (solo administradores)")
    .addStringOption((o) =>
      o
        .setName("fuente")
        .setDescription("Qué sincronizar")
        .setRequired(false)
        .addChoices(
          { name: "Todo", value: "all" },
          { name: "Hoja oficial", value: "official" },
          { name: "API de tradeo", value: "trade" }
        )
    ),

  new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Estadísticas del bot y estado de sincronización"),

  new SlashCommandBuilder()
    .setName("ayuda")
    .setDescription("Muestra los comandos disponibles")
].map((c) => c.toJSON());

export async function registerCommands(client) {
  const application = client.application;
  if (!application) return;

  for (const guild of client.guilds.cache.values()) {
    try {
      await guild.commands.set(COMMANDS);
      console.log(`✅ Comandos registrados en ${guild.name} (${guild.id})`);
    } catch (error) {
      console.error(`⚠️ No se pudieron registrar comandos en ${guild.id}:`, error.message);
    }
  }
}
