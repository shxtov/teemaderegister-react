import React from 'react'
import { PropTypes } from 'prop-types'
import Cards from './Cards'

const typeMap = {
  BA: 'Bakalaureuseõpe',
  MA: 'Magistriõpe',
  PHD: 'Doktoriõpe'
}

const Collection = props => {
  const { curriculums } = props

  return (
    <div>
      {curriculums.map(single => {
        const { type, collection } = single

        return (
          <div className="home-curriculums" key={type}>
            <h1>
              {typeMap[type]}
            </h1>
            <Cards type={type} collection={collection} />
          </div>
        )
      })}
    </div>
  )
}

Collection.propTypes = {
  curriculums: PropTypes.array.isRequired
}

export default Collection
