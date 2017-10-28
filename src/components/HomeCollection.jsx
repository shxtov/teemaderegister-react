import React from 'react'
import { PropTypes } from 'prop-types'
import HomeCards from './HomeCards'

const typeMap = {
  BA: 'Bakalaureuseõpe',
  MA: 'Magistriõpe',
  PHD: 'Doktoriõpe'
}

const HomeCollection = props => {
  const { curriculums } = props

  return (
    <div>
      {curriculums.map(single => {
        const { type, collection } = single

        return (
          <div className='home-curriculums' key={type}>
            <h1>
              {typeMap[type]}
            </h1>
            <HomeCards type={type} collection={collection} />
          </div>
        )
      })}
    </div>
  )
}

HomeCollection.propTypes = {
  curriculums: PropTypes.array.isRequired
}

export default HomeCollection
