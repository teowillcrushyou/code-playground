import assert from "node:assert/strict";
import test from "node:test";

import {
  applyCastleRepair,
  applyGateEffect,
  castleDamageForEscape,
  resolveCrowdCombat,
} from "../app/alcan-block-brigade/crowdLogic.ts";

test("growth and shrink gates change the whole group exactly once", () => {
  assert.equal(applyGateEffect(18, "multiply", 2, 200), 36);
  assert.equal(applyGateEffect(18, "add", 12, 200), 30);
  assert.equal(applyGateEffect(18, "subtract", 8, 200), 10);
  assert.equal(applyGateEffect(18, "divide", 2, 200), 9);
  assert.equal(applyGateEffect(140, "multiply", 2, 200), 200);
  assert.equal(applyGateEffect(25, "multiply", 1.5, 200), 37);
});

test("three typical intact groups nearly destroy a full wall", () => {
  assert.equal(castleDamageForEscape(1), 2);
  assert.equal(castleDamageForEscape(20), 33);
  assert.equal(castleDamageForEscape(80), 45);
  assert.equal(castleDamageForEscape(20) * 3, 99);
  assert.equal(applyCastleRepair(61, 22), 83);
  assert.equal(applyCastleRepair(92, 22), 100);
});

test("combat always removes the same number from both groups", () => {
  assert.deepEqual(resolveCrowdCombat(36, 15, 7), {
    playerCount: 29,
    enemyCount: 8,
    casualties: 7,
  });
  assert.deepEqual(resolveCrowdCombat(36, 15, 30), {
    playerCount: 21,
    enemyCount: 0,
    casualties: 15,
  });
  assert.deepEqual(resolveCrowdCombat(10, 24, 30), {
    playerCount: 0,
    enemyCount: 14,
    casualties: 10,
  });
});
