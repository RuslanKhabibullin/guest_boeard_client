import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"

const Dashboard = ({ signedIn }) => {
  if (signedIn) {
    return <h1>Dashboard</h1>
  } else {
    return <Redirect to="/signin" />
  }
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authentication.loaded }
}

Dashboard.propTypes = {
  signedIn: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Dashboard)
