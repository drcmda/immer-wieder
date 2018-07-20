[![Build Status](https://travis-ci.org/drcmda/immer-wieder.svg?branch=master)](https://travis-ci.org/drcmda/immer-wieder) [![codecov](https://codecov.io/gh/drcmda/immer-wieder/branch/master/graph/badge.svg)](https://codecov.io/gh/drcmda/immer-wieder) [![npm version](https://badge.fury.io/js/immer-wieder.svg)](https://badge.fury.io/js/immer-wieder)

immer-wieder is a react 16 context wrap with redux semantics powered by [immer](https://github.com/mweststrate/immer).

It behaves like your generic react 16 context provider/consumer with the distinction that you can provide actions (which either support setState reducers or immer drafts, where you don't need to write reducers any longer).

The provider will not re-render its contents on state changes like reacts would. The consumer can optionally pick state, in which case it will render only when the state it is interested in changes, similar to reduxes connect.

    npm install immer-wieder

[![](/assets/api.jpg)](https://codesandbox.io/s/qvm2oz51mj)

[Demo](https://codesandbox.io/s/qvm2oz51mj)
