import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { Permissions, Notifications } from 'expo'

import reducers from './reducers'
import LoginForm from './components/LoginForm'
import Router from './Router'

class App extends Component {
  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk))
    
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
