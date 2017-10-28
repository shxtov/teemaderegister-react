import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom'

import HeaderWrapContainer from './containers/HeaderWrapContainer'
import RouteWrapContainer from './containers/RouteWrapContainer'

import HomeContainer from './containers/HomeContainer'
import NotFound from './components/NotFound'
import LoginContainer from './containers/LoginContainer'
import CurriculumContainer from './containers/CurriculumContainer'
import SupervisorContainer from './containers/SupervisorContainer'
import SearchContainer from './containers/SearchContainer'

import store from './store'

import '../styles/main.scss'

// import antd fonts for webpack
import './fonts/iconfont.eot'
import './fonts/iconfont.svg'
import './fonts/iconfont.ttf'
import './fonts/iconfont.woff'

import { Layout, LocaleProvider } from 'antd'
import etEE from 'antd/lib/locale-provider/et_EE'

const { Content, Footer } = Layout

render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <LocaleProvider locale={etEE}>
        <Layout className='layout'>
          <Route component={HeaderWrapContainer} />
          <Content>
            <div id='content-wrapper'>
              <Switch>
                <Route exact path='/' component={RouteWrapContainer(HomeContainer)} />
                <Route exact path='/login' component={RouteWrapContainer(LoginContainer)} />
                <Route path='/search' component={RouteWrapContainer(SearchContainer)} />
                <Route
                  path='/curriculum/:slug'
                  component={RouteWrapContainer(CurriculumContainer)}
                />
                <Route
                  path='/supervisor/:slug'
                  component={RouteWrapContainer(SupervisorContainer)}
                />
                <Route component={RouteWrapContainer(NotFound)} />
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
