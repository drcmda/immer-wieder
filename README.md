<span class="badge-patreon"><a href="https://www.patreon.com/0xca0a" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span> [![Build Status](https://travis-ci.org/drcmda/immer-wieder.svg?branch=master)](https://travis-ci.org/drcmda/immer-wieder) [![npm version](https://badge.fury.io/js/immer-wieder.svg)](https://badge.fury.io/js/immer-wieder)

`immer-wieder` is a small api-compatible wrap around Reacts context, behaving in the same way with the distinction that you can

1. provide actions
2. mutate state directly instead of writing reducers (it's using [immer](https://github.com/mweststrate/immer))
3. optionally select state, so that components only render when the state they subscribe to changes

If you look at the [code](https://github.com/drcmda/immer-wieder/blob/master/src/index.js) it should become clear that it lets React do all the work in order to create as little surface for maintenance and bugs as possible.

## Install

    npm install immer-wieder

## Import

```jsx
import createContext from 'immer-wieder'
```

## Create context

```jsx
const { Provider, Consumer } = createContext((setState, getState) => ({
  // Everything in here is your state
  filter: '*',
  // Including actions, you can wrap and nest them if you like ...
  actions: {
    // Actions do not have to mutate state at all, you can use getState to fetch state
    cacheState: id => getState(state => fetch(`/backend?cache=${state.stringify()}`),
    // setState behaves like always with the distinction that you can mutate state
    setFilter: text =>
      setState(state => {
        // You are allowed to mutate state in here ...
        state.filter = text
        // Or return a reduced shallow clone of state like always
        // return { ...state, filter }
      }),
  },
}))
```

## Provide once, then consume, anywhere within the providers tree

```jsx
const App = () => (
  <Provider>
    <Consumer select={store => store.filter}>
      {filter => ids.map(id => <EditDetails key={id} id={id} />)}
    </Consumer>
  </Provider>
)
```

[Demo: Provider & Consumer](https://codesandbox.io/embed/qvm2oz51mj)

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

## Contributions

All my open source projects are done in my free time, if you like any of them, consider helping out, all contributions are welcome as well as donations, for instance through [Patreon](https://www.patreon.com/0xca0a).
