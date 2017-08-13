import React from 'react'
import { PropTypes } from 'prop-types'
import { Col, Card, Row } from 'antd'
import { Link } from 'react-router-dom'

import noneBack from '../../media/none-home-back.svg'
import halfBack from '../../media/half-home-back.svg'
import fullBack from '../../media/full-home-back.svg'

const colorMap = {
  BA: fullBack,
  MA: halfBack,
  PHD: noneBack
}

const Cards = props => {
  const { type, collection } = props

  let items = []

  collection.forEach((c, i) => {
    let { abbreviation, names, slugs, _id, languages } = c
    const cardBackground = { backgroundImage: 'url(' + colorMap[type] + ')' }
    languages = languages.map(
      (l, i) =>
        l + ((i !== languages.length - 1) & (languages.length > 1) ? '/' : '')
    )

    items.push(
      <Col key={i} sm={12} md={8}>
        <Link to={'/curriculum/' + slugs.et}>
          <Card
            key={_id}
            className="curriculum-card"
            style={cardBackground}
            bordered={true}
          >
            <h2>
              {names.et}
            </h2>
            <p>
              {abbreviation} | {languages}
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

Cards.propTypes = {
  type: PropTypes.string.isRequired,
  collection: PropTypes.array.isRequired
}

export default Cards
