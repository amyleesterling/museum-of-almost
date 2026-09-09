// Time and sand amounts are independent of drawing and animation frame rate.
class SandClock {
  constructor(duration = 60000, turnDuration = 1200) {
    this.duration = duration;
    this.turnDuration = turnDuration;
    this.upper = 0;
    this.startedAt = 0;
    this.turn = null;
    this.hasRun = false;
  }

  read(now) {
    if (this.turn && now >= this.turn.endsAt) {
      this.upper = 1 - this.turn.upper;
      this.startedAt = this.turn.endsAt;
      this.turn = null;
    }
    if (this.turn) {
      const t = (now - this.turn.startedAt) / this.turnDuration;
      return {
        upper: this.turn.upper,
        lower: 1 - this.turn.upper,
        angle: Math.PI * t * t * (3 - 2 * t),
        turning: true,
        flowing: false,
        hasRun: this.hasRun
      };
    }
    const upper = this.hasRun
      ? Math.max(0, this.upper - (now - this.startedAt) / this.duration)
      : 0;
    return { upper, lower: 1 - upper, angle: 0, turning: false,
      flowing: upper > 0, hasRun: this.hasRun };
  }

  flip(now, reducedMotion = false) {
    const state = this.read(now);
    if (state.turning) return false;
    this.hasRun = true;
    this.turn = { upper: state.upper, startedAt: now,
      endsAt: now + (reducedMotion ? 0 : this.turnDuration) };
    this.read(now);
    return true;
  }
}
