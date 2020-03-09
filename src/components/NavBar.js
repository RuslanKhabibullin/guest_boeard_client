import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux"
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  navLink: {
    textDecoration: "none",
    color: theme.palette.common.white
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
}))

const NavBar = ({ signedIn }) => {
  const { navLink, toolbar } = useStyles()

  return (
    <AppBar position="static">
      <Toolbar className={toolbar}>
        <Typography component="h1" variant="h5">
          <RouterLink className={navLink} to="/">
            GuestBoard
          </RouterLink>
        </Typography>
        {signedIn ? <RouterLink to="/signout" className={navLink}>Logout</RouterLink> : null}
      </Toolbar>
    </AppBar>
  )
}

NavBar.propTypes = {
  signedIn: PropTypes.bool.isRequired
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authentication.loaded }
}

export default connect(mapStateToProps)(NavBar)
