import formContainer from './formContainer'
import PropTypes from "prop-types"
import { signUp } from "../../actions/userActions"
import { connect } from "react-redux"
import unauthorizedOnly from '../../decorators/unauthorizedOnly'
import React from 'react'

const SignUp = ({ signUp }) => {
  const Form = formContainer("signup", signUp)
  return <Form />
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return { signUp: ({ email, password }) => dispatch(signUp({ email, password })) }
}

export default unauthorizedOnly(
  connect(null, mapDispatchToProps)(SignUp)
)
