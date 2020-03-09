import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

const authorizedOnly = (OriginalComponent) => ({ signedIn }) => {
  if (signedIn) {
    return <OriginalComponent /> 
  } else {
    return <Redirect to="/signin" />
  }
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authentication.loaded }
}

export default (OriginalComponent) => connect(mapStateToProps)(authorizedOnly(OriginalComponent))
