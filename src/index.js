import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Route, Switch, Link } from 'react-router-dom'
import { Layout } from 'antd'
const { Header, Content, Footer } = Layout

import MyHeader from 'components/MyHeader/MyHeader'
import RouteCheck from 'utils/RouteCheck'

import Home from 'containers/Home'
import NotFound from 'containers/NotFound'
import Login from 'containers/Login'
import Curriculum from 'containers/Curriculum'

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
          <div id="header-wrapper">
            <Link to="/">
              <div className="header-logo">Te</div>
            </Link>
            <Route component={MyHeader} />
          </div>
        </Header>
        <Content>
          <div id="content-wrapper">
            <Switch>
              <Route exact path="/" restrict component={RouteCheck(Home)} />
              <Route exact path="/login" component={RouteCheck(Login)} />
              <Route
                path="/curriculum/:abbreviation"
                component={RouteCheck(Curriculum)}
              />
              <Route component={RouteCheck(NotFound)} />
            </Switch>
          </div>
        </Content>
        <Footer>
          TLU ©{new Date().getFullYear()} | Made by Romil Rõbtšenkov
        </Footer>
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#main')
)
