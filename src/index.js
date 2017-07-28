import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Route, Switch, Link } from 'react-router-dom'
import { Layout } from 'antd'
const { Header, Content, Footer } = Layout

import MyHeader from 'components/MyHeader/MyHeader'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import RouteCheck from 'utils/RouteCheck'

import Home from 'containers/Home'
import NotFound from 'containers/NotFound'
import Login from 'containers/Login'

import store from 'store/configureStore'

import './stylesheet/index.scss'

// import antd fonts for webpack
import './fonts/iconfont.eot'
import './fonts/iconfont.svg'
import './fonts/iconfont.ttf'
import './fonts/iconfont.woff'

render(
  <Provider store={store}>
    <BrowserRouter history={createBrowserHistory()}>
      <Layout className="layout">
        <Header>
          <div className="header-wrapper">
            <Link to="/">
              <div className="header-logo">Te</div>
            </Link>
            <Route component={MyHeader} />
          </div>
        </Header>
        <Content>
          <Route component={Breadcrumbs} />
          <div id="content-wrapper">
            <Switch>
              <Route exact path="/" restrict component={RouteCheck(Home)} />
              <Route exact path="/login" component={RouteCheck(Login)} />
              <Route component={RouteCheck(NotFound)} />
            </Switch>
          </div>
        </Content>
        <Footer>
          Romil Rõbtšenkov ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#main')
)
