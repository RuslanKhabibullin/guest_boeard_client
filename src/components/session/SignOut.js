import React from "react"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { connect} from "react-redux"
import { signOut } from "../../actions/userActions"

function SignOut({ signOut }) {
  signOut()
  return <Redirect to="/signin" />
}

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return { signOut: () => dispatch(signOut()) }
}

export default connect(null, mapDispatchToProps)(SignOut)
