import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom'
import { Layout, LocaleProvider } from 'antd'
import etEE from 'antd/lib/locale-provider/et_EE'

const { Content, Footer } = Layout

import HeaderWrap from './components/HeaderWrap'
import RouteWrap from './components/RouteWrap'

import Home from './components/Home'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Curriculum from './components/Curriculum'
import Supervisor from './components/Supervisor'
import Search from './components/Search'

import store from './store'

import './app.scss'

// import antd fonts for webpack
import './fonts/iconfont.eot'
import './fonts/iconfont.svg'
import './fonts/iconfont.ttf'
import './fonts/iconfont.woff'

render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <LocaleProvider locale={etEE}>
        <Layout className="layout">
          <Route component={HeaderWrap} />
          <Content>
            <div id="content-wrapper">
              <Switch>
                <Route exact path="/" restrict component={RouteWrap(Home)} />
                <Route exact path="/login" component={RouteWrap(Login)} />
                <Route path="/search" component={RouteWrap(Search)} />
                <Route
                  path="/curriculum/:slug"
                  component={RouteWrap(Curriculum)}
                />
                <Route
                  path="/supervisor/:slug"
                  component={RouteWrap(Supervisor)}
                />
                <Route component={RouteWrap(NotFound)} />
              </Switch>
            </div>
          </Content>
          <Footer>
            TLU ©{new Date().getFullYear()} | Made by Romil Rõbtšenkov
          </Footer>
        </Layout>
      </LocaleProvider>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#main')
)
