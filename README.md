[![Build Status](https://travis-ci.org/drcmda/immer-wieder.svg?branch=master)](https://travis-ci.org/drcmda/immer-wieder) [![codecov](https://codecov.io/gh/drcmda/immer-wieder/branch/master/graph/badge.svg)](https://codecov.io/gh/drcmda/immer-wieder) [![npm version](https://badge.fury.io/js/immer-wieder.svg)](https://badge.fury.io/js/immer-wieder)

    npm install immer-wieder

```jsx
import React from 'react'
import { render } from 'react-dom'
import createContext from './store'

const { Provider, Consumer } = createContext(setState => ({
  // This is the default state
  users: {
    1: { id: 1, name: 'Max' },
    2: { id: 2, name: 'Catherine' },
  },
  ids: [1, 2],

  // Actions can go right into state, or wrap them in further objects ...
  setUserName: (id, name) =>
    // setState behaves like generic setState with immer semantics (draft)
    // https://github.com/mweststrate/immer
    setState((state, draft) => {
      // You can mutate the draft
      draft.users[id].name = name
      // Or return a reduced shallow clone of state like always
      // return { ...state, users: { ...state.users, [id]: { ...state.users[id], name } } }
    }),
}))

const User = ({ id }) => (
  <Consumer
    // We fetch actions right from the store
    select={({ users, setUserName }) => ({ ...users[id], setUserName })}>
    {({ name, setUserName }) => (
      <div>
        <input
          value={name}
          onChange={({ target: { value } }) => setUserName(id, value)}
        />
        {name}
      </div>
    )}
  </Consumer>
)

const Users = () => (
  // A consumer can select state,
  // or subscribe to any state-change by ommitting select
  <Consumer select={store => store.ids}>
    {ids => ids.map(id => <User key={id} id={id} />)}
  </Consumer>
)

const App = () => (
  // The provider is the store, it needs to wrap all consumers
  // It behaves like any generic context provider, it can be driven
  // by value={} as well, in that case, like above, it can take a function
  // that passes setState.
  <Provider>
    <Users />
  </Provider>
)

render(<App />, document.getElementById('root'))
```
