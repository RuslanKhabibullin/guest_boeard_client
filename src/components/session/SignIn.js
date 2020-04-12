import React from 'react'
import PropTypes from "prop-types"
import { signIn } from "../../actions/userActions"
import { connect } from "react-redux"
import unauthorizedOnly from '../../decorators/unauthorizedOnly'
import { Container, Typography, TextField, Button, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { validate } from '../../validations'
import GoogleAuthButton from './GoogleAuthButton'
import Loader from '../Loader'

const SignIn = ({ signIn, authLoading }) => {
  const styles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(10),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    links: {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-end"
    },
    errors: {
      color: theme.palette.error.main
    }
  }))()
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate,
    onSubmit: signIn
  })

  return (
    <Container component="main" maxWidth="xs">
      <div className={styles.paper}>
        { authLoading && <Loader /> }
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={values.email}
          />
          {errors.email ? <span className={styles.errors}>{errors.email}</span> : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password ? <span className={styles.errors}>{errors.password}</span> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Sign in
          </Button>
          <GoogleAuthButton />
          <div className={styles.links}>
            <Link component={RouterLink} to="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </Container>
  )
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired
}

const mapStateToProps = ({ user }) => {
  return { authLoading: user.authentication.loading }
}

const mapDispatchToProps = dispatch => {
  return { signIn: ({ email, password }) => dispatch(signIn({ email, password })) }
}

export default unauthorizedOnly(
  connect(mapStateToProps, mapDispatchToProps)(SignIn)
)
