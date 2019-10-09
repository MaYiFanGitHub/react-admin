import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import {
  Provider
} from 'react-redux'

import App from './containers/App'

ReactDOM.render((
  <Provider store={store}>
    <App></App>
  </Provider>
), document.getElementById('root'))