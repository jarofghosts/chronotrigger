var through = require('through')

module.exports = chronotrigger

function chronotrigger(ee, start, end, _timeout, _now, _settimeout) {
  var now = _now || date_now,
      settimeout = _settimeout || do_settimeout

  var timeout = _timeout || 5000,
      stream = through(),
      timer = null,
      end_time = 0,
      start_time

  ee.on(start, log_start)
  ee.on(end, log_end)

  return stream

  function log_start() {
    var right_now = now(),
        timings

    if (timer) clearTimeout(timer)
    if (end_time) {
      timings = [end_time - start_time, right_now - end_time]

      stream.queue(timings)
    }

    start_time = right_now
  }

  function log_end() {
    end_time = now()
    if (timeout) timer = settimeout(flush, timeout)
  }

  function flush() {
    stream.queue([end_time - start_time, timeout])
    end_time = 0
  }
}

function date_now() {
  return Date.now()
}

function do_settimeout() {
  return setTimeout.apply(null, arguments)
}
