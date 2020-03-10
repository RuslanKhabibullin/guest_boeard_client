import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { googleSignIn } from '../services/googleApi'
import { connect } from 'react-redux'
import { googleSignIn as googleSignInAC } from '../../actions/userActions'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  googleButton: {
    backgroundColor: "#4285F4",
    textTransform: "none",
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#4285F4',
      color: theme.palette.common.white
    }
  },
  googleIcon: {
    marginRight: theme.spacing(1),
    width: "24px",
    height: "24px"
  }
}))

const GoogleAuthButton = ({ googleSignInAC }) => {
  const { googleButton, googleIcon } = useStyles()
  const clickHandler = () => {
    googleSignIn().then(googleUser => {
      const idToken = googleUser.getAuthResponse().id_token
      googleSignInAC(idToken) 
    })
  }

  return (
    <Button
      fullWidth
      className={googleButton}
      variant="contained"
      onClick={clickHandler}
    >
      <img alt="google icon" src="/g-logo.png" className={googleIcon} />
      Sign in with Google
    </Button>
  )
}

GoogleAuthButton.propTypes = {
  googleSignInAC: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return { googleSignInAC: token => dispatch(googleSignInAC(token)) }
}

export default connect(null, mapDispatchToProps)(GoogleAuthButton)
