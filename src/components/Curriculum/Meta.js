import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'

import { Avatar, Tooltip } from 'antd'

import noneBack from '../../media/none-cur-back.svg'
import halfBack from '../../media/half-cur-back.svg'
import fullBack from '../../media/full-cur-back.svg'

const colorMap = {
  BA: fullBack,
  MA: halfBack,
  PHD: noneBack
}

class Meta extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      names,
      abbreviation,
      type,
      languages,
      representative
    } = this.props.data

    const { profile } = representative
    const typeMap = {
      BA: 'Bakalaureuseõpe',
      MA: 'Magistriõpe',
      PHD: 'Doktoriõpe'
    }

    languages = languages.map(
      (l, i) =>
        l + ((i !== languages.length - 1) & (languages.length > 1) ? '/' : '')
    )

    return (
      <div
        style={{
          backgroundImage: 'url(' + colorMap[type] + ')',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          padding: '15px'
        }}
      >
        <h1>
          {names.et}
        </h1>
        <i>
          <h3>
            {abbreviation} | {names.en}
          </h3>
        </i>
        <br />
        <h4>
          {typeMap[type]} - {languages}
        </h4>
        <br />
        <div className="c-representative">
          <Tooltip title={'Õppekava kuraator'}>
            <Avatar
              shape="square"
              size="small"
              icon="user"
              style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                display: 'inline-table',
                marginRight: '5px'
              }}
            />
            <span>
              {profile.firstName + ' ' + profile.lastName}
            </span>
          </Tooltip>
        </div>
      </div>
    )
  }
}

Meta.propTypes = {
  data: PropTypes.object.isRequired
}

export default Meta
