// Adapted from MF#4144/NMP#1538. Scoped vecDelta is already divided by4096.
function finite (point) {
  if (![point.x, point.y, point.z].every(Number.isFinite)) throw new Error('Invalid entity movement coordinates')
  return point
}
function applyEntityDelta (entity, packet, scale) {
  let steps
  if (packet.move) steps = packet.move.steps.map(s => ({ x: s.dX / 4096, y: s.dY / 4096, z: s.dZ / 4096 }))
  else if (packet.delta) {
    const d = packet.delta
    steps = d.steps?.length ? d.steps : [{ x: d.x ?? d.dX, y: d.y ?? d.dY, z: d.z ?? d.dZ }]
  } else steps = [{ x: packet.dX / scale, y: packet.dY / scale, z: packet.dZ / scale }]
  for (const step of steps) { finite(step); entity.position.translate(step.x, step.y, step.z) }
  finite(entity.position)
  if (packet.move || packet.delta) entity.onGround = (packet.move ?? packet.delta).onGround
}
function applyEntitySync (entity, packet) {
  let steps
  if (packet.position?.type === 'stepped') steps = packet.position.path.steps.map(s => s.position)
  else if (packet.position?.type === 'linear') steps = [packet.position.path.endPosition]
  else if (packet.positionType === 'stepped') steps = packet.steps
  else steps = [packet]
  for (const step of steps) { finite(step); entity.position.set(step.x, step.y, step.z) }
  if ([packet.dx, packet.dy, packet.dz].every(Number.isFinite)) entity.velocity.set(packet.dx, packet.dy, packet.dz)
  if (packet.onGround !== undefined) entity.onGround = packet.onGround
}
module.exports = { applyEntityDelta, applyEntitySync }
