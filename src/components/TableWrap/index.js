import { connect } from 'react-redux'
import TableWrap from './TableWrap'

import { getTableContent } from '../TableContent/TableContentActions'

export default connect(null, { getTableContent })(TableWrap)
