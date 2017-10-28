import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'

import { Avatar, Tooltip } from 'antd'

import noneBack from '../media/none-cur-back.svg'
import halfBack from '../media/half-cur-back.svg'
import fullBack from '../media/full-cur-back.svg'

const propTypes = {
  meta: PropTypes.object.isRequired
}

class CurriculumMeta extends PureComponent {
  constructor (props) {
    super(props)

    this.colorMap = {
      BA: fullBack,
      MA: halfBack,
      PHD: noneBack
    }

    this.typeMap = {
      BA: 'Bakalaureuseõpe',
      MA: 'Magistriõpe',
      PHD: 'Doktoriõpe'
    }
  }

  render () {
    let {
      names,
      abbreviation,
      type,
      languages,
      representative: { profile }
    } = this.props.meta

    languages = languages.map(
      (l, i) =>
        l + ((i !== languages.length - 1) & (languages.length > 1) ? '/' : '')
    )

    const metaBackGround = { backgroundImage: 'url(' + this.colorMap[type] + ')' }

    return (
      <div id='curriculum-meta' style={metaBackGround}>
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
          {this.typeMap[type]} - {languages}
        </h4>
        <br />
        <div className='c-representative'>
          <Tooltip title={'Õppekava kuraator'}>
            <Avatar
              className='curriculum-avatar'
              shape='square'
              size='small'
              icon='user'
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

CurriculumMeta.propTypes = propTypes

export default CurriculumMeta
