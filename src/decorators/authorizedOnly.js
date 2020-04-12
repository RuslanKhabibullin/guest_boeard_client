import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Loader from '../components/Loader'

const authorizedOnly = (OriginalComponent) => ({ signedIn, authLoading }) => {
  if (signedIn) return <OriginalComponent /> 
  if (authLoading) return <Loader />

  return <Redirect to="/signin" />
}

const mapStateToProps = ({ user }) => {
  return {
    signedIn: user.authentication.loaded,
    authLoading: user.authentication.loading
  }
}

export default (OriginalComponent) => connect(mapStateToProps)(authorizedOnly(OriginalComponent))
