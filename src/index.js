import React, { Component, PureComponent } from 'react'
import immer from 'immer'

class RenderPure extends PureComponent {
  render() {
    const { children, ...props } = this.props
    return typeof children === 'function' ? children(props) : children
  }
}

export default function(actions) {
  const Context = React.createContext()
  return {
    Consumer: ({ select = props => props, children }) => {
      const fn = ({ __obj, ...rest }) => children(__obj ? rest : rest.pick)
      return (
        <Context.Consumer
          children={store => {
            const pick = select(store)
            const isObject = pick === Object(pick) && !Array.isArray(pick)
            const props = isObject ? pick : { pick }
            return <RenderPure __obj={isObject} {...props} children={fn} />
          }}
        />
      )
    },
    Provider: class Provider extends Component {
      constructor({ value }) {
        super()
        const input = value || actions
        this.state = typeof input === 'function' ? input(this.update) : input
      }
      update = (fn, cb) => this.setState(state => immer(state, fn), cb)
      render() {
        return (
          <Context.Provider
            value={this.state}
            children={<RenderPure children={this.props.children} />}
          />
        )
      }
    },
  }
}
