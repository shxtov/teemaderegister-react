import React from 'react'
import { Button } from 'antd'

class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome to Home page</p>
        <Button type="primary">Primary</Button>
        <Button type="danger">Danger</Button>
      </div>
    )
  }
}

export default Home
