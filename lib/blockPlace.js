// Protocol777 groups the vanilla hit result; older schemas keep flat fields.
function writeBlockPlace (bot, packet) {
  if (bot.protocolVersion < 777) return bot._client.write('block_place', packet)
  const { location, direction, cursorX, cursorY, cursorZ, insideBlock = false, worldBorderHit = false } = packet
  for (const value of [location?.x, location?.y, location?.z, cursorX, cursorY, cursorZ]) {
    if (!Number.isFinite(value)) throw new Error('Invalid block hit coordinates')
  }
  if (!Number.isInteger(direction) || direction < 0 || direction > 5) throw new Error('Invalid block hit face')
  return bot._client.write('block_place', {
    hand: packet.hand ?? 0,
    hitResult: { location, direction, cursorX, cursorY, cursorZ, insideBlock, worldBorderHit },
    sequence: packet.sequence ?? bot._nextSequence?.() ?? 0
  })
}
module.exports = { writeBlockPlace }
