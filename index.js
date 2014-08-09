var through = require('through')

module.exports = chronotrigger

function chronotrigger(ee, start, end, _timeout, _now, _settimeout) {
  var settimeout = _settimeout || doSettimeout
    , now = _now || dateNow

  var timeout = _timeout || 5000
    , stream = through()
    , timer = null
    , endTime = 0
    , startTime

  ee.on(start, logStart)
  ee.on(end, logEnd)

  return stream

  function logStart() {
    var rightNow = now()
      , timings

    if(timer) clearTimeout(timer)
    if(endTime) {
      timings = [endTime - startTime, rightNow - endTime]

      stream.queue(timings)
    }

    startTime = rightNow
  }

  function logEnd() {
    endTime = now()
    if(timeout) timer = settimeout(flush, timeout)
  }

  function flush() {
    stream.queue([endTime - startTime, timeout])
    endTime = 0
  }
}

function dateNow() {
  return Date.now()
}

function doSettimeout() {
  return setTimeout.apply(null, arguments)
}
