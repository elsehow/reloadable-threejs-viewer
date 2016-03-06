var h = require('virtual-dom/h')
var EE = require('events').EventEmitter
function declare (fn, store) {
  var ml = require('main-loop')
  var l = ml(store, fn, require('virtual-dom'))
  document.querySelector('#app').appendChild(l.target)
  return l
}

// here's a simple model of the program
// 
//    view = F(state)
//
// the view is a pure function of the state
// 
// but...users can do stuff in the view
// which can affect the application state.
// so, we give the view a way to communicate to the state 
// - a Dispatcher.
// 
//    view = F(state, dispatcher)
//
var dispatcher = new EE()
// the view can emit events over this dispatcher
// and, some Actions listen to these events
// and mutate `state` based on what they hear,
// and what they do in response to what they hear
//
//    view = F(state, dispatcher)
//    actions(dispatcher, state)
//
// now, whenever `actions` wants to signal 
// that it's time for the view to update,
// it emits an 'update' event over dispatcher
//
// thats it!
// data flows in a circle,
//
//    view ----> actions
//      ^          |
//      |          |
//    state <-------
//
// we can livecode `view.js` and `actions.js`.
// `store.js` represents the initial application state, and
// we can't live code that. changes to `store.js` 
// take effect on refresh.
//
// do you see why?
//
// the `state` is just `store` at some point in time
// we can't live-code the state. instead,
// we modify the rules by which the state updates
// when we change `action.js` and `view.js`
//
// happy live-coding!
// nick



// data structures

var store = {
  n: 0
}


// view logic

function render (state) {

  return h('div', [
    h('h1', `clicked ${state.n} times`),
    h('button', { onclick: handleClick }, 'click me!')
  ])

  function handleClick (ev) {
    dispatcher.emit('button-click', ev)
  }
}

// actions
function actions (loop) {
  dispatcher.on('button-click', (ev) => {
    store.n = store.n+1 
    loop.update(store)
  })
}



var loop = declare(render, store)
actions(loop)

