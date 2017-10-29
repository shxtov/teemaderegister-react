import React from 'react'
import { PropTypes } from 'prop-types'
import { Col, Card, Row } from 'antd'
import { Link } from 'react-router-dom'

import noneBack from '../media/none-home-back.svg'
import halfBack from '../media/half-home-back.svg'
import fullBack from '../media/full-home-back.svg'

const { array, arrayOf, shape, string } = PropTypes

const propTypes = {
  collection: arrayOf(
    PropTypes.shape({
      _id: string.isRequired,
      abbreviation: string.isRequired,
      languages: array.isRequired,
      names: shape({
        et: string.isRequired
      }).isRequired,
      slugs: shape({
        et: string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  type: string.isRequired
}

const HomeCards = props => {
  const { type, collection } = props

  const colorMap = {
    BA: fullBack,
    MA: halfBack,
    PHD: noneBack
  }

  let items = []

  collection.forEach((c, i) => {
    const { abbreviation, names, slugs, _id, languages } = c
    const cardBackground = { backgroundImage: 'url(' + colorMap[type] + ')' }
    const languageList = languages.map(
      (l, i) =>
        l + ((i !== languages.length - 1) & (languages.length > 1) ? '/' : '')
    )

    items.push(
      <Col key={i} sm={12} md={8}>
        <Link to={'/curriculum/' + slugs.et}>
          <Card
            key={_id}
            className='curriculum-card'
            style={cardBackground}
            bordered
          >
            <h2>
              {names.et}
            </h2>
            <p>
              {abbreviation} | {languageList}
            </p>
          </Card>
        </Link>
      </Col>
    )
  })

  return (
    <Row gutter={24}>
      {items}
    </Row>
  )
}

HomeCards.propTypes = propTypes

export default HomeCards
