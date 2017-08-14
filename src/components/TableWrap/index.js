import { connect } from 'react-redux'
import TableWrap from './TableWrap'

import {
  getTableContent,
  finishLoading
} from '../TableContent/TableContentActions'

const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, { getTableContent, finishLoading })(
  TableWrap
)
