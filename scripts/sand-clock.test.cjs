const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { runInNewContext } = require('node:vm');
const SandClock = runInNewContext(readFileSync(join(__dirname, '../src/sand-clock.js'), 'utf8') + '\nSandClock;');

test('a full bulb drains in one minute after the turn ends', () => {
  const clock = new SandClock();
  assert.equal(clock.read(0).lower, 1);
  clock.flip(0);
  assert.equal(clock.read(600).turning, true);
  assert.equal(clock.read(600).flowing, false);
  assert.equal(clock.read(1200).upper, 1);
  assert.equal(clock.read(31200).upper, 0.5);
  assert.equal(clock.read(61200).upper, 0);
  assert.equal(clock.read(61200).lower, 1);
  assert.equal(clock.read(61200).flowing, false);
});

test('turning partway through preserves and exchanges the remaining sand', () => {
  const clock = new SandClock();
  clock.flip(0);
  assert.equal(clock.read(16200).upper, 0.75);
  clock.flip(16200);
  assert.equal(clock.read(17400).upper, 0.25);
  assert.equal(clock.read(32400).flowing, false);
});

test('rapid clicks cannot create sand or interrupt a turn', () => {
  const clock = new SandClock();
  assert.equal(clock.flip(0), true);
  assert.equal(clock.flip(400), false);
  for (const now of [0, 400, 1200, 9000, 60000, 70000]) {
    const sand = clock.read(now);
    assert.ok(sand.upper >= 0 && sand.upper <= 1);
    assert.equal(sand.upper + sand.lower, 1);
  }
});

test('reduced motion skips rotation but keeps the real minute', () => {
  const clock = new SandClock();
  clock.flip(5000, true);
  assert.equal(clock.read(5000).turning, false);
  assert.equal(clock.read(5000).angle, 0);
  assert.equal(clock.read(5000).upper, 1);
  assert.equal(clock.read(35000).upper, 0.5);
  assert.equal(clock.read(65000).flowing, false);
});

test('time keeps passing when no animation frames are requested', () => {
  const clock = new SandClock();
  clock.flip(0);
  const afterReturning = clock.read(46200);
  assert.equal(afterReturning.upper, 0.25);
  assert.equal(clock.read(300000).flowing, false);
});
