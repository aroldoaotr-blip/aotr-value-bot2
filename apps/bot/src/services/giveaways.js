// Gestor de sorteos (estado en memoria con botones)

export class GiveawayManager {
  constructor() {
    this.active = new Map();
  }

  create(id, data) {
    this.active.set(id, data);
  }

  get(id) {
    return this.active.get(id);
  }

  join(id, userId) {
    const giveaway = this.active.get(id);
    if (!giveaway || giveaway.ended) return { ok: false, reason: "ended" };
    if (giveaway.participants.has(userId)) return { ok: false, reason: "already" };

    giveaway.participants.add(userId);
    return { ok: true };
  }

  end(id) {
    const giveaway = this.active.get(id);
    if (!giveaway) return null;

    giveaway.ended = true;

    const participantIds = [...giveaway.participants];
    if (participantIds.length === 0) {
      this.active.delete(id);
      return { winners: [], none: true };
    }

    const totalWinners = Math.min(giveaway.winnerCount, participantIds.length);
    const winners = [];

    for (let i = 0; i < totalWinners; i++) {
      const randomIndex = Math.floor(Math.random() * participantIds.length);
      winners.push(participantIds[randomIndex]);
      participantIds.splice(randomIndex, 1);
    }

    this.active.delete(id);
    return { winners };
  }

  list() {
    return [...this.active.values()];
  }
}
