import React from 'react'
import { PropTypes } from 'prop-types'
import { Col, Card, Row, Collapse } from 'antd'
import { Link } from 'react-router-dom'

import noneBack from '../media/none-home-back.svg'
import halfBack from '../media/half-home-back.svg'
import fullBack from '../media/full-home-back.svg'

const { array, arrayOf, shape, string } = PropTypes

const Panel = Collapse.Panel

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
  let closedItems = []

  collection.forEach((c, i) => {
    if (c.closed != null) {
      c.closed = 'Suletud'
    }

    const { abbreviation, names, slugs, _id, languages, closed } = c
    const cardBackground = { backgroundImage: 'url(' + colorMap[type] + ')' }
    const languageList = languages.map(
      (l, i) =>
        l + ((i !== languages.length - 1) & (languages.length > 1) ? '/' : '')
    )
    if (c.closed == null) {
      items.push(
        <Col key={i} sm={12} md={8}>
          <Link to={'/curriculum/' + slugs.et}>
            <Card
              key={_id}
              className='homeCards__card'
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
    } else {
      closedItems.push(
        <Col key={i} sm={12} md={8}>
          <Link to={'/curriculum/' + slugs.et}>
            <Card
              key={_id}
              className='homeCards__card'
              style={cardBackground}
              bordered
            >
              <h2>
                {names.et}
              </h2>
              <p>
                {abbreviation} | {languageList} | <b>{closed}</b>
              </p>
            </Card>
          </Link>
        </Col>
      )
    }
  })

  return (
    <div>
      <Row className='homeCards' gutter={24}>
        {items}

      </Row>
      <Collapse bordered={false}>
        <Panel header="Suletud" key="1">
          <Row className='closedCards' gutter={24}>
            {closedItems}
          </Row>
        </Panel>
      </Collapse>
    </div>
  )
}

HomeCards.propTypes = propTypes

export default HomeCards
