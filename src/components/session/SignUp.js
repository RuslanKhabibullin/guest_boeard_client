import React from 'react'
import PropTypes from "prop-types"
import { signUp } from "../../actions/userActions"
import { connect } from "react-redux"
import unauthorizedOnly from '../../decorators/unauthorizedOnly'
import { Container, Typography, TextField, Button, Link, Grid } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { validate } from '../../validations'
import GoogleAuthButton from './GoogleAuthButton'

const SignUp = ({ signUp }) => {
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
    row: {
      margin: theme.spacing(2, 0, 2),
      padding: theme.spacing(0),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    column: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
      display: "flex",
      flexDirection: "column",
      maxWidth: "49%",
      boxSizing: "border-box"
    },
    errors: {
      color: theme.palette.error.main
    }
  }))()
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
    validate,
    onSubmit: signUp
  })
 
  return (
    <Container component="main" maxWidth="xs">
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          Sign up
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
          <Grid container className={styles.row}>
            <Grid className={styles.column} item>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                value={values.firstName}
              />
              {errors.firstName ? <span className={styles.errors}>{errors.firstName}</span> : null}
            </Grid>
            <Grid className={styles.column} item>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
                value={values.lastName}
              />
              {errors.lastName ? <span className={styles.errors}>{errors.lastName}</span> : null}
            </Grid>
          </Grid>
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
            Sign up
          </Button>
          <GoogleAuthButton />
          <div className={styles.links}>
            <Link component={RouterLink} to="/signin" variant="body2">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </Container>
  )
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return { signUp: (payload) => dispatch(signUp(payload)) }
}

export default unauthorizedOnly(
  connect(null, mapDispatchToProps)(SignUp)
)
