import React from 'react'
import { Input } from 'valuelink/lib/tags'
import PropTypes from 'prop-types'

export default class FormInput extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <label>
        {this.props.label}
        <br />
        <Input {...this.props} />
        <div className="error-placeholder">
          {this.props.valueLink.error || ''}
        </div>
      </label>
    )
  }
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  valueLink: PropTypes.object.isRequired
}
