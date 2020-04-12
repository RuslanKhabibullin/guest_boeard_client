import React from 'react'
import authorizedOnly from '../decorators/authorizedOnly'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Dashboard = ({ user }) => {
  const { firstName, lastName, email } = user
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, {firstName} {lastName} ({email})</p>
    </div>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => {
  return { user: user.record }
}

export default authorizedOnly(connect(mapStateToProps)(Dashboard))
