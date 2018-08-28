[![Build Status](https://travis-ci.org/drcmda/immer-wieder.svg?branch=master)](https://travis-ci.org/drcmda/immer-wieder) [![codecov](https://codecov.io/gh/drcmda/immer-wieder/branch/master/graph/badge.svg)](https://codecov.io/gh/drcmda/immer-wieder) [![npm version](https://badge.fury.io/js/immer-wieder.svg)](https://badge.fury.io/js/immer-wieder)

    npm install immer-wieder
    
`immer-wieder` behaves like your generic react 16 context provider/consumer with the distinction that you can:

* provide actions (which support setState reducers [or immer drafts](https://github.com/mweststrate/immer), where you don't need to write reducers any longer) 
* and select state (where components only render if the state they subscribe to changes). 

If you look at the [code](https://github.com/drcmda/immer-wieder/blob/master/src/index.js), it should become clear that it lets react do all the work in order to create as little surface for maintenance and bugs as possible.

```jsx
import createContext from 'immer-wieder'

const { Provider, Consumer } = createContext(setState => ({
  // Everything in here is your state
  bands: {
    0: { name: 'Flipper' },
    1: { name: 'Melt Banana' },
  },
  ids: [0, 1],
  // ... including actions
  // You can wrap and nest them, too, makes it easier to access them later ...
  actions: {
    changeName: (id, name) =>
      // setState behaves like generic setState with immer semantics
      setState(draft => {
        // You can mutate the draft
        draft.bands[id].name = name
        // Or return a reduced shallow clone of state like always
        // return { ...draft, users: { ...draft.users, [id]: { ...draft.users[id], name } } }
      }),
  },
}))

const EditDetails = ({ id }) => (
  // Select is optional, if present the component renders only when the state you select changes
  // Actions can be fetched right from the store
  <Consumer select={store => ({ ...store.bands[id], ...store.actions })}>
    {({ name, changeName }) => (
      <div>
        <h1>{name}</h1>
        <input value={name} onChange={e => changeName(id, e.target.value)} />
      </div>
    )}
  </Consumer>
)

const App = () => (
  <Provider>
    <Consumer select={store => store.ids}>
      {ids => ids.map(id => <EditDetails key={id} id={id} />)}
    </Consumer>
  </Provider>
)
```

[Demo: Provider & Consumer](https://codesandbox.io/embed/qvm2oz51mj)

[Demo: Middleware](https://codesandbox.io/embed/52on3pvywl)
