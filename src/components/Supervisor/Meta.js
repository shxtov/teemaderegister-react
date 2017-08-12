import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col, Icon, Popover, Card } from 'antd'
import { ResponsiveContainer, Tooltip, AreaChart, Area, XAxis } from 'recharts'

class Meta extends PureComponent {
  constructor(props) {
    super(props)
  }
  renderTooltip(data) {
    if (!data.payload || !data.payload[0]) return null
    const { name, counts } = data.payload[0].payload
    const { all, types } = counts

    return (
      // Show only if not empty
      <div
        style={{
          padding: 10,
          backgroundColor: 'rgb(255, 255, 255)',
          border: '1px solid rgb(204, 204, 204)',
          whiteSpace: 'nowrap'
        }}
      >
        <h4>
          {name} õa kokku {all}
        </h4>
        {Object.keys(types).map(key => {
          const t = types[key]
          return (
            <p key={key}>
              {key}: {t}
            </p>
          )
        })}
      </div>
    )
  }
  render() {
    const { data, count } = this.props
    const registeredTypes = count.registered.types
    const defendedTypes = count.defended.types
    const { profile } = data

    const name = profile.firstName + ' ' + profile.lastName

    return (
      <div>
        <Row gutter={24} type="flex" style={{ marginBottom: '10px' }}>
          <Col
            sm={13}
            md={12}
            style={{ display: 'flex', marginBottom: '15px' }}
          >
            <img
              style={{ width: 150, height: 150 }}
              src={
                'http://via.placeholder.com/150/b1e3da/ffffff/?text=' +
                profile.firstName[0] +
                ' ' +
                profile.lastName[0]
              }
            />
            <div
              style={{
                display: 'inline-block',
                paddingLeft: '18px',
                maxHeight: '105px'
              }}
            >
              <h1
                style={{
                  lineHeight: 1,
                  marginBottom: '10px'
                }}
              >
                {name}
              </h1>
              <h3>Tarkvaratehnika õpetaja</h3>
              <h3 style={{ lineHeight: 1 }}>Tallinna Ülikool | A-431</h3>
              <div style={{ marginTop: 10 }}>
                {/*TODO concat if too long <email></email>*/}
                E-mail: romil.robtsenkov@romil.ee
                <br />
                Phone: 6555524 <br />
                Links: <a href="github.com">Github</a>,{' '}
                <a href="github.com">ETIS</a>
              </div>
            </div>
          </Col>

          <Col
            xs={24}
            sm={{ span: 10, offset: 1 }}
            md={{ span: 11, offset: 1 }}
            style={{ marginBottom: '15px' }}
          >
            <div
              style={{
                minHeight: '50px',
                minWidth: '200px'
              }}
            >
              <h4>Topics</h4>
              <div>
                Tallinna Ülikooli vilistlane, kes on lõpetanud nii Informaatika
                eriala bakalaureuse tasemel kui ka läbinud magistriõppe.
                Õppejõuna üritab ta pidevalt ennast täiendada ning kasutada uusi
                tehnoloogiaid, rõhudes alati praktilise lõppväljundi
              </div>
            </div>
          </Col>
        </Row>

        <div style={{ display: 'flex', marginBottom: '-15px' }}>
          <Card style={{ width: 120, height: 120 }}>
            <span
              style={{
                textAlign: 'center',
                display: 'block',
                lineHeight: 1,
                marginTop: 5
              }}
            >
              Supervising <br /> today
            </span>

            <h1
              style={{
                lineHeight: 1,
                fontSize: '40px',
                textAlign: 'center',
                marginTop: 10
              }}
            >
              <Popover
                content={
                  <div>
                    {Object.keys(registeredTypes).map(key => {
                      return (
                        <p key={key}>
                          {key}: {registeredTypes[key]}
                        </p>
                      )
                    })}
                  </div>
                }
                placement="right"
              >
                {count.registered.all}
                <Icon
                  style={{
                    fontSize: '15px',
                    marginLeft: '3px'
                  }}
                  type="info-circle-o"
                />
              </Popover>
            </h1>
            <br />
          </Card>
          <Card
            style={{ width: 'calc(100% - 120px)' }}
            className="defendedCard"
          >
            <ResponsiveContainer height={103}>
              <AreaChart
                data={count.defended.chartData}
                margin={{ top: 5, right: 5, bottom: 5, left: 120 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="05%"
                      stopColor="rgb(107,202,186)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="rgb(107,202,186)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Tooltip
                  content={this.renderTooltip}
                  cursor={false}
                  active={true}
                />
                <Area
                  type="monotone"
                  dataKey="counts.all"
                  stroke="rgb(107,202,186)"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
                <XAxis
                  dataKey="name"
                  tickSize={8}
                  tickLine={false}
                  axisLine={false}
                  tick={{ color: '#6BCABA' }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div
              style={{
                position: 'absolute',
                color: '#6BCABA',
                top: 15,
                minWidth: 90
              }}
            >
              <span
                style={{
                  textAlign: 'center',
                  display: 'block',
                  lineHeight: 1,
                  marginTop: 5
                }}
              >
                Total <br />supervised
              </span>
              <h1
                style={{
                  lineHeight: 1,
                  fontSize: '40px',
                  color: '#6BCABA',
                  textAlign: 'center',
                  marginTop: 10
                }}
              >
                <Popover
                  content={
                    <div>
                      {Object.keys(defendedTypes).map(key => {
                        return (
                          <p key={key}>
                            {key}: {defendedTypes[key]}
                          </p>
                        )
                      })}
                    </div>
                  }
                  placement="right"
                >
                  {count.defended.all}
                  <Icon
                    style={{
                      fontSize: '15px',
                      marginLeft: '3px'
                    }}
                    type="info-circle-o"
                  />
                </Popover>
              </h1>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

Meta.propTypes = {
  data: PropTypes.object.isRequired,
  count: PropTypes.object.isRequired
}

export default Meta
