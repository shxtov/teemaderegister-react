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
    let { abbreviation, name, _id, languages } = c
    const cardStyle = {
      backgroundImage: 'url(' + colorMap[type] + ')'
    }
    languages = languages.map(
      (l, i) =>
        l + ((i !== languages.length - 1) & (languages.length > 1) ? '/' : '')
    )

    items.push(
      <Col key={i} sm={12} md={8}>
        <Link to={'/curriculum/' + abbreviation}>
          <Card
            key={_id}
            className="curriculum-card"
            style={cardStyle}
            bordered={true}
          >
            <h2>
              {name}
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
