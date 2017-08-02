import React from 'react'
import { PropTypes } from 'prop-types'
import './CurriculumMeta.scss'
import { connect } from 'react-redux'

import { Avatar, Tag, Tooltip } from 'antd'

import noneBack from 'media/none-cur-back.svg'
import halfBack from 'media/half-cur-back.svg'
import fullBack from 'media/full-cur-back.svg'

const colorMap = {
  BA: fullBack,
  MA: halfBack,
  PHD: noneBack
}

class CurriculumMeta extends React.Component {
  constructor(props) {
    super(props)
  }

  getLangs(languages) {
    return languages.map(lang => {
      return (
        <Tag key={lang}>
          {lang}
        </Tag>
      )
    })
  }

  render() {
    console.log('R:CurriculumMeta')
    //console.log(this.props.curriculumMeta)
    //TODO do not rerender if url changes for tab

    let {
      name,
      nameEng,
      abbreviation,
      type,
      languages,
      representative
    } = this.props.curriculumMeta

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
          {name}
        </h1>
        <i>
          <h3>
            {abbreviation} | {nameEng}
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

CurriculumMeta.propTypes = {
  curriculumMeta: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    curriculumMeta: state.curriculumMeta.meta
  }
}

export default connect(mapStateToProps)(CurriculumMeta)
