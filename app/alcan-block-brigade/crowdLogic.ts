export type GateOperator = "multiply" | "add" | "subtract" | "divide";

export function applyGateEffect(
  count: number,
  operator: GateOperator,
  value: number,
  cap: number,
) {
  let next = count;
  if (operator === "multiply") next = count * value;
  else if (operator === "add") next = count + value;
  else if (operator === "subtract") next = count - value;
  else next = Math.floor(count / value);
  return Math.max(1, Math.min(cap, Math.floor(next)));
}

export function resolveCrowdCombat(playerCount: number, enemyCount: number, requestedCasualties: number) {
  const casualties = Math.max(
    0,
    Math.min(Math.floor(requestedCasualties), playerCount, enemyCount),
  );
  return {
    playerCount: playerCount - casualties,
    enemyCount: enemyCount - casualties,
    casualties,
  };
}

export function castleDamageForEscape(survivors: number) {
  if (survivors <= 0) return 0;
  return Math.min(45, Math.max(1, Math.ceil(survivors * 1.65)));
}

export function applyCastleRepair(health: number, repair: number, cap = 100) {
  return Math.max(0, Math.min(cap, health + repair));
}
