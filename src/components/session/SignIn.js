import formContainer from './formContainer'
import PropTypes from "prop-types"
import { signIn } from "../../actions/userActions"
import { connect } from "react-redux"
import unauthorizedOnly from '../../decorators/unauthorizedOnly'
import React from 'react'

const SignIn = ({ signIn }) => {
  const Form = formContainer("signin", signIn)
  return <Form />
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return { signIn: ({ email, password }) => dispatch(signIn({ email, password })) }
}

export default unauthorizedOnly(
  connect(
    null,
    mapDispatchToProps
  )(SignIn)
)
