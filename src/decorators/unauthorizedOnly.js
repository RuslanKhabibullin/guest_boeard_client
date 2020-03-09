import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

const UnauthorizedOnly = (OriginalComponent) => ({ signedIn }) => {
  if (signedIn) {
    return <Redirect to="/" />
  } else {
    return <OriginalComponent /> 
  }
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authentication.loaded }
}

export default (OriginalComponent) => connect(mapStateToProps)(UnauthorizedOnly(OriginalComponent))
