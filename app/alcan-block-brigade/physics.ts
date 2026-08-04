export type BlockHitbox = { x: number; y: number; width: number; height: number };

type CircleMover = { x: number; y: number; radius: number };
type Point = { x: number; y: number };

export type RivalCollision = {
  x: number;
  y: number;
  blockedX: boolean;
  blockedY: boolean;
  block: BlockHitbox | null;
};

export function resolveRivalMotion(
  current: CircleMover,
  desired: Point,
  blocks: BlockHitbox[],
): RivalCollision {
  let x = desired.x;
  let y = desired.y;
  let blockedX = false;
  let blockedY = false;
  let collidedBlock: BlockHitbox | null = null;

  for (const block of blocks) {
    const left = block.x - block.width / 2 - current.radius;
    const right = block.x + block.width / 2 + current.radius;
    const top = block.y - block.height / 2 - current.radius;
    const bottom = block.y + block.height / 2 + current.radius;

    if (x <= left || x >= right || y <= top || y >= bottom) continue;

    collidedBlock = block;
    if (current.y <= top) {
      y = top;
      blockedY = true;
    } else if (current.y >= bottom) {
      y = bottom;
      blockedY = true;
    } else if (current.x <= left) {
      x = left;
      blockedX = true;
    } else if (current.x >= right) {
      x = right;
      blockedX = true;
    } else {
      const penetrationLeft = x - left;
      const penetrationRight = right - x;
      const penetrationTop = y - top;
      const penetrationBottom = bottom - y;
      const minimum = Math.min(penetrationLeft, penetrationRight, penetrationTop, penetrationBottom);

      if (minimum === penetrationLeft) {
        x = left;
        blockedX = true;
      } else if (minimum === penetrationRight) {
        x = right;
        blockedX = true;
      } else if (minimum === penetrationTop) {
        y = top;
        blockedY = true;
      } else {
        y = bottom;
        blockedY = true;
      }
    }
  }

  return { x, y, blockedX, blockedY, block: collidedBlock };
}

export function chooseBarrierDetour(
  rivalX: number,
  currentVx: number,
  radius: number,
  block: BlockHitbox,
  minX: number,
  maxX: number,
) {
  const leftExit = block.x - block.width / 2 - radius;
  const rightExit = block.x + block.width / 2 + radius;
  const canExitLeft = leftExit >= minX;
  const canExitRight = rightExit <= maxX;
  const leftDistance = Math.abs(rivalX - leftExit);
  const rightDistance = Math.abs(rightExit - rivalX);

  let direction: -1 | 1;
  if (!canExitLeft && canExitRight) direction = 1;
  else if (canExitLeft && !canExitRight) direction = -1;
  else if (leftDistance === rightDistance && currentVx !== 0) direction = currentVx < 0 ? -1 : 1;
  else direction = leftDistance <= rightDistance ? -1 : 1;

  return direction * Math.max(22, Math.abs(currentVx));
}
