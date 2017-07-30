import React from 'react'
import { PropTypes } from 'prop-types'
import { Col, Card, Row } from 'antd'
import { Link } from 'react-router-dom'

import './CurriculumTypeCollection.scss'

import noneBack from 'media/none-home-back.svg'
import halfBack from 'media/half-home-back.svg'
import fullBack from 'media/full-home-back.svg'

const colorMap = {
  BA: fullBack,
  MA: halfBack,
  PHD: noneBack
}

class CurriculumTypeCollection extends React.Component {
  render() {
    const { type, collection } = this.props

    let items = []

    collection.forEach((c, i) => {
      const { abbreviation, name, _id } = c
      const cardStyle = {
        backgroundImage: 'url(' + colorMap[type] + ')'
      }

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
                {abbreviation}
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
}

CurriculumTypeCollection.propTypes = {
  type: PropTypes.string.isRequired,
  collection: PropTypes.array.isRequired
}

export default CurriculumTypeCollection
