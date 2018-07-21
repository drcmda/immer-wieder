import createContext from 'immer-wieder'

const { Provider, Consumer, Middleware } = createContext(setState => ({
  theme: { color: 'black', backgroundColor: 'teal' },
  text: 'type something',
  setText: text =>
    setState(draft => {
      draft.text = text
    }),
}))

const ShowText = () => (
  <Consumer select={store => ({ text: store.text, theme: store.theme })}>
    {props => (
      <div style={props.theme} className="text">
        {props.text}
      </div>
    )}
  </Consumer>
)

const InvertTheme = ({ children }) => (
  <Middleware
    children={children}
    select={draft => {
      for (let key in draft.theme) draft.theme[key] = invert(draft.theme[key])
    }}
  />
)

const InvertText = ({ children }) => (
  <Middleware
    children={children}
    select={draft => {
      draft.text = reverse(draft.text)
    }}
  />
)

const Input = () => (
  <Consumer>
    {props => (
      <input
        value={props.text}
        onChange={({ target: { value } }) => props.setText(value)}
      />
    )}
  </Consumer>
)

const App = () => (
  <Provider>
    <Input />
    <ShowText />
    <InvertTheme>
      <InvertText>
        <ShowText />
      </InvertText>
    </InvertTheme>
  </Provider>
)
