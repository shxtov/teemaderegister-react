import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import setUrl from '../../utils/setUrl'
import { Form, Input, Layout } from 'antd'
import './HeaderWrap.scss'

const Search = Input.Search
const { Header } = Layout

class HeaderWrap extends Component {
  constructor (props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)

    this.defaultSearch = ''
    const { q } = queryString.parse(props.history.location.search)
    if (q) {
      props.setSearch(q)
      this.defaultSearch = q
    }
  }

  // Disable update on every simple change
  // shouldComponentUpdate(nextProps) {
  //   const authChanged = this.props.auth.user !== nextProps.auth.user
  //   return authChanged
  // }

  componentWillUpdate (nextProps) {
    // remove searchword if removed from props
    if (this.props.search.q && !nextProps.search.q) {
      nextProps.form.setFieldsValue({ searchField: '' })
    }
  }

  componentDidMount () {
    if (this.defaultSearch) {
      this.props.getSearchCounts(this.defaultSearch)
      this.props.form.setFieldsInitialValue({
        searchField: this.defaultSearch
      })
    }
  }

  handleSearch (value) {
    this.props.getSearchCounts(value)
    setUrl(
      this.props.history.replace,
      '/search',
      Object.assign(queryString.parse(this.props.history.location.search), {
        q: value
      })
    )
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { isAuthenticated, user } = this.props.auth

    return (
      <Header>
        <div id='header-wrapper'>
          <Link to='/'>
            <div className='header-logo'>Te</div>
          </Link>
          <div className='header-content'>
            <div className='search'>
              <Form>
                {getFieldDecorator('searchField')(
                  <Search
                    size='large'
                    placeholder='Search title or supervisor'
                    onSearch={this.handleSearch}
                  />
                )}
              </Form>
            </div>
            {!isAuthenticated &&
              <div className='header-login'>
                <Link to='/login'>Sign in</Link>
              </div>}
            {isAuthenticated &&
              <div>
                <p>
                  Welcome {user.email}{' '}
                  <button onClick={this.props.logout}>logout</button>
                </p>
              </div>}
          </div>
        </div>
      </Header>
    )
  }
}

HeaderWrap.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,

  setSearch: PropTypes.func.isRequired,
  getSearchCounts: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  history: PropTypes.object.isRequired
}

export default Form.create()(HeaderWrap)
