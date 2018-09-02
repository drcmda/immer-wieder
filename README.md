[![Build Status](https://travis-ci.org/drcmda/immer-wieder.svg?branch=master)](https://travis-ci.org/drcmda/immer-wieder) [![npm version](https://badge.fury.io/js/immer-wieder.svg)](https://badge.fury.io/js/immer-wieder)

    npm install immer-wieder

`immer-wieder` behaves like your generic react 16 context provider/consumer with the distinction that you can:

- provide actions (which support setState reducers [or Immer-drafts](https://github.com/mweststrate/immer), where you don't need to write reducers any longer)
- and select state (where components only render if the state they subscribe to changes).

If you look at the [code](https://github.com/drcmda/immer-wieder/blob/master/src/index.js), it should become clear that it lets react do all the work in order to create as little surface for maintenance and bugs as possible.

## Usage

```jsx
import createContext from 'immer-wieder'

const { Provider, Consumer } = createContext((setState, getState) => ({
  // Everything in here is your state
  bands: {
    0: { name: 'Flipper' },
    1: { name: 'Melt Banana' },
  },
  ids: [0, 1],
  // ... including actions
  // You can wrap and nest them, too, makes it easier to access them later ...
  actions: {
    // Actions do not have to mutate state at all, you can use getState to fetch state
    cacheState: id => getState(state => fetch(`/backend?cache=${state.stringify()}`),
    // Otherwise setState behaves like always
    removeAll: () => setState({ bands: {}, ids: [] }),
    // With the distinction that you can use immer semantics
    changeName: (id, name) =>
      setState(state => {
        // You are allowed to mutate state
        state.bands[id].name = name
        // Or return a reduced shallow clone of state like always
        // return { ...state, users: { ...state.users, [id]: { ...state.users[id], name } } }
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

## Inline mutations using `void`

Draft mutations usually warrant a code block, since a return denotes a overwrite in Immer. Sometimes that can stretch code a little more than you might be comfortable with. In such cases you can use javascripts [`void`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void) operator, which evaluates expressions and returns `undefined`.

```javascript
// Single mutation
setState(state => void (state.user.age += 1))

// Multiple mutations
setState(state => void ((state.user.age += 1), (state.user.height = 186)))
```

## What about HOCs?

Sometimes you need to access render props in lifecycles or you just don't like them at all.

```jsx
import createContext from 'immer-wieder'

const { Provider, hoc } = createContext((setState, getState) => ({ ... }))

@hoc((store, props) => ({ item: store.items[props.id] }))
class Item extends Component {
  render() {
    return <div>{this.props.item</div>
  }
}

const App = () => (
  <Provider>
    <Item id={1} />
  </Provider>
)
```
