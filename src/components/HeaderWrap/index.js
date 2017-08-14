import { connect } from 'react-redux'

import HeaderWrap from './HeaderWrap'
import { logout } from './HeaderWrapActions.js'
import { setSearch, getSearchCounts } from '../Search/SearchActions'

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})

export default connect(mapStateToProps, { logout, setSearch, getSearchCounts })(
  HeaderWrap
)
