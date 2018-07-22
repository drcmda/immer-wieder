[![Build Status](https://travis-ci.org/drcmda/immer-wieder.svg?branch=master)](https://travis-ci.org/drcmda/immer-wieder) [![codecov](https://codecov.io/gh/drcmda/immer-wieder/branch/master/graph/badge.svg)](https://codecov.io/gh/drcmda/immer-wieder) [![npm version](https://badge.fury.io/js/immer-wieder.svg)](https://badge.fury.io/js/immer-wieder)

    npm install immer-wieder
    
`immer-wieder` behaves like your generic react 16 context provider/consumer with the distinction that you can provide actions (which either support setState reducers [or immer drafts, where you don't need to write out reducers any longer](https://github.com/mweststrate/immer)) and select state (where components only render if the state they subscribe to changes).

[![](/assets/api.jpg)](https://codesandbox.io/s/qvm2oz51mj)

[Demo: Provider & Consumer](https://codesandbox.io/embed/qvm2oz51mj)

[Demo: Middleware](https://codesandbox.io/embed/52on3pvywl)
