import assert from "node:assert/strict";
import test from "node:test";

import { chooseBarrierDetour, resolveRivalMotion } from "../app/alcan-block-brigade/physics.ts";

test("a rival stops at the top of a barrier instead of walking through it", () => {
  const block = { x: 195, y: 300, width: 70, height: 62 };
  const contactY = block.y - block.height / 2 - 7;
  const first = resolveRivalMotion(
    { x: 195, y: contactY - 1, radius: 7 },
    { x: 195, y: contactY + 4 },
    [block],
  );

  assert.equal(first.y, contactY);
  assert.equal(first.blockedY, true);

  const next = resolveRivalMotion(
    { x: first.x, y: first.y, radius: 7 },
    { x: first.x, y: first.y + 4 },
    [block],
  );
  assert.equal(next.y, contactY);
  assert.equal(next.blockedY, true);
});

test("a rival is pushed back from the side of a barrier", () => {
  const block = { x: 195, y: 300, width: 70, height: 62 };
  const contactX = block.x - block.width / 2 - 7;
  const collision = resolveRivalMotion(
    { x: contactX - 1, y: 300, radius: 7 },
    { x: contactX + 4, y: 300 },
    [block],
  );

  assert.equal(collision.x, contactX);
  assert.equal(collision.blockedX, true);
});

test("a rival detours toward the open road edge", () => {
  const leftBarrier = { x: 78, y: 300, width: 58, height: 50 };
  const rightBarrier = { x: 312, y: 300, width: 58, height: 50 };

  assert.ok(chooseBarrierDetour(78, -5, 7, leftBarrier, 62, 328) > 0);
  assert.ok(chooseBarrierDetour(312, 5, 7, rightBarrier, 62, 328) < 0);
});
