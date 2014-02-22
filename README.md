chronotrigger
====

turn events into timing information

## what

takes an `EventEmitter`, start event, and end event. keeps timing information
and streams it when useful.

## usage 

#### `chronotrigger(emitter, start_event, end_event, optional_timeout)`

* `emitter` will have listeners attached for `start_event` and `end_event`
* once enough data is available, an array will be streamed of:
`["elapsed time from start to end", "elapsed time from end to next start"]`
* providing an optional third timeout argument will stream the timings after
that timeout if the next event is not triggered within it.

## example

```js
var timings = require('chronotrigger'),
    fs = require('fs')

timings(mouse_event_emitter, 'mouseenter', 'mouseexit')
  .pipe(fs.createWriteStream('mouse-hover-times'))
```

## license

MIT
