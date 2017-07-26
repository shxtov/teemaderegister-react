import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Header from 'components/Header/Header'
import RouteCheck from 'utils/RouteCheck'

import Home from 'containers/Home'
import NotFound from 'containers/NotFound'
import Login from 'containers/Login'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={createBrowserHistory()}>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" restrict component={RouteCheck(Home)} />
            <Route exact path="/login" component={RouteCheck(Login)} />
            <Route component={RouteCheck(NotFound)} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
