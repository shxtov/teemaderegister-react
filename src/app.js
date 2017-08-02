import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Route, Switch, Link } from 'react-router-dom'
import { Layout, LocaleProvider } from 'antd'
import etEE from 'antd/lib/locale-provider/et_EE'

const { Header, Content, Footer } = Layout

import HeaderWrap from './components/HeaderWrap'
import RouteWrap from './Components/RouteWrap'

import Home from './components/Home'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Curriculum from './components/Curriculum'

import store from './store'

import './app.scss'

// import antd fonts for webpack
import './fonts/iconfont.eot'
import './fonts/iconfont.svg'
import './fonts/iconfont.ttf'
import './fonts/iconfont.woff'

render(
  <Provider store={store}>
    <BrowserRouter history={createBrowserHistory()}>
      <LocaleProvider locale={etEE}>
        <Layout className="layout">
          <Header>
            <div id="header-wrapper">
              <Link to="/">
                <div className="header-logo">Te</div>
              </Link>
              <Route component={HeaderWrap} />
            </div>
          </Header>
          <Content>
            <div id="content-wrapper">
              <Switch>
                <Route exact path="/" restrict component={RouteWrap(Home)} />
                <Route exact path="/login" component={RouteWrap(Login)} />
                <Route
                  path="/curriculum/:abbreviation"
                  component={RouteWrap(Curriculum)}
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
