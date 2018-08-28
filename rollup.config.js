import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const root = process.platform === 'win32' ? path.resolve('/') : '/'
const external = id => !id.startsWith('.') && !id.startsWith(root)
const getBabelOptions = ({ useESModules }) => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', { regenerator: false, useESModules }]],
})

export default [
  {
    input: 'src/index.js',
    output: { file: `${pkg.module}.js`, format: 'esm' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: true }))],
  },
  {
    input: 'src/index.js',
    output: { file: `${pkg.main}.js`, format: 'cjs' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: false }))],
  },
]
