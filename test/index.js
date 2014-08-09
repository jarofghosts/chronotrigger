var EE = require('events').EventEmitter

var test = require('tape')

var chronotrigger = require('../')

test('properly calculates difference', function(t) {
  var nowCalled = 0
    , ee = new EE

  t.plan(1)

  chronotrigger(ee, 'start', 'end', 0, fakeNow).on('data', function(data) {
    console.error('called')
    t.deepEqual(data, [1000, 2000])
  })

  function fakeNow() {
    nowCalled++

    if(nowCalled === 1) return 1
    if(nowCalled === 2) return 1001
    if(nowCalled === 3) return 3001
  }

  ee.emit('start')
  ee.emit('end')
  ee.emit('start')
})

test('has a configurable timeout', function(t) {
  var nowCalled = 0
    , ee = new EE()

  t.plan(1)

  chronotrigger(ee, 'start', 'end', 2000, fakeNow, fakeTimeout)
    .on('data', checkValue)

  function checkValue(data) {
    t.deepEqual(data, [1000, 2000])
  }

  function fakeNow() {
    nowCalled++
    if(nowCalled === 1) return 1
    if(nowCalled === 2) return 1001
  }

  function fakeTimeout(fn) {
    fn()
  }

  ee.emit('start')
  ee.emit('end')
})
