// Adapted from PrismarineJS/mineflayer#4146 (651195051e539c7737397b1c1167c882848031f3).
// The scoped data does not yet expose the upstream feature, so gate on wire protocol.
function getPlayerActionIds (bot) {
  const shifted = bot.protocolVersion >= 777
  return { start: 0, abort: shifted ? 2 : 1, finish: shifted ? 3 : 2, releaseUseItem: shifted ? 6 : 5 }
}
module.exports = { getPlayerActionIds }
