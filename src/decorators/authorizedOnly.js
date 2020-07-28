import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Loader from "../components/Loader"
import { fetchProfile } from "../actions/userActions"

const authorizedOnly = (OriginalComponent) => class AuthorizedOnlyWrapper extends Component {
  componentDidMount() {
    const { authentication, record, fetchProfile } = this.props

    if (authentication.loaded && !record.loaded && !record.loading) {
      fetchProfile(authentication.token)
    }
  }

  render() {
    const { authentication, record } = this.props

    if (authentication.loaded && record.loaded) return <OriginalComponent />
    if (authentication.loading || record.loading) return <Loader />

    return <Redirect to="/signin" />
  }
}

const mapStateToProps = ({ user }) => {
  return {
    authentication: user.authentication,
    record: user.record
  }
}

const mapDispatchToProps = (dispatch) => {
  return { fetchProfile: (token) => dispatch(fetchProfile(token)) }
}

export default (OriginalComponent) => connect(mapStateToProps, mapDispatchToProps)(authorizedOnly(OriginalComponent))
