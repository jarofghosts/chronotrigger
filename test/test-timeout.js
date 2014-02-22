var chronotrigger = require('../'),
    assert = require('assert'),
    EE = require('events').EventEmitter,
    Writable = require('stream').Writable

    var ws = Writable({ objectMode: true }),
        now_called = 0,
        ee = new EE()

ws._write = function(data, enc, next) {
  assert.deepEqual(data, [1000, 2000])
  next()
}

chronotrigger(ee, 'start', 'end', 2000, fake_now, fake_timeout).pipe(ws)

function fake_now() {
  now_called++
  if (now_called === 1) return 1
  if (now_called === 2) return 1001
}

function fake_timeout(fn) {
  fn()
}

ee.emit('start')
ee.emit('end')
