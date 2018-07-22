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
