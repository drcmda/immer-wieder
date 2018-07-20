import createContext from 'immer-wieder'

const { Provider, Consumer } = createContext(setState => ({
  // This is the default state
  users: {
    1: { id: 1, name: 'No-Name' },
  },
  ids: [1],

  // Actions can go right into state, or wrap them in further objects ...
  setUserName: (id, name) =>
    // setState behaves like generic setState with immer semantics (draft)
    setState((state, draft) => {
      // You can mutate the draft
      draft.users[id].name = name
      // Or return a reduced shallow clone of state like always
      // return { ...state, users: { ...state.users, [id]: { ...state.users[id], name } } }
    }),
}))

const User = ({ id }) => (
  <Consumer
    // Select is optional, if present the component renders only on specific state changes
    // Actions can be fetched right from the store
    select={({ users, setUserName }) => ({ ...users[id], setUserName })}>
    {({ name, setUserName }) => (
      <div>
        <input value={name} onChange={e => setUserName(id, e.target.value)} />
        {name}
      </div>
    )}
  </Consumer>
)

const Users = () => (
  <Consumer select={store => store.ids}>
    {ids => ids.map(id => <User key={id} id={id} />)}
  </Consumer>
)

const App = () => (
  <Provider>
    <Users />
  </Provider>
)
