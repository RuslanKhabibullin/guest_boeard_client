import React from 'react'
import { Container, Typography, TextField, Button, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { emailValidate, passwordValidate } from '../../validations'

const validate = ({ email, password }) => {
  const errors = {}
 
  if (!emailValidate(email)) {
    errors.email = 'Invalid email address'
  } else if (!passwordValidate(password)) {
    errors.password = 'Password should have more than 7 symbols'
  }

  return errors
}

const linkBlock = (type) => {
  if (type === "signin") {
    return (
      <Link component={RouterLink} to="/signup" variant="body2">
        Don't have an account? Sign Up
      </Link>
    )
  } else {
    return (
      <Link component={RouterLink} to="/signin" variant="body2">
        Already have an account? Sign In
      </Link>
    )
  }
}

export default (type, onSubmit) => () => {
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
      marginTop: theme.spacing(1),
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
    onSubmit: onSubmit
  })
  const title = type === "signin" ? "Sign in" : "Sign up"
 
  return (
    <Container component="main" maxWidth="xs">
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          {title}
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
            {title}
          </Button>
          <div className={styles.links}>
            {linkBlock(type)}
          </div>
        </form>
      </div>
    </Container>
  )
}
