import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Tooltip
} from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ProfileIcon from "./icons/ProfileIcon"
import LogoutIcon from "./icons/LogoutIcon"

const useStyles = makeStyles(theme => ({
  navLink: {
    color: theme.palette.common.white,
    textDecoration: "none"
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  profileBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.common.white,
    justifyContent: "space-between"
  }
}))

const NavBar = ({ signedIn }) => {
  const { navLink, toolbar, profileBar } = useStyles()

  const showProfileBar = () => {
    if (!signedIn) return null

    return (
      <List className={profileBar} component="nav" aria-label="profile navigation">
        <Tooltip title="Profile page" aria-label="profile-page">
          <ListItem button component={RouterLink} to="#">
            <ProfileIcon />
          </ListItem>
        </Tooltip>
        <Tooltip title="Logout" aria-label="logout">
          <ListItem button component={RouterLink} to="/signout">
            <LogoutIcon />
          </ListItem>
        </Tooltip>
      </List>
    )
  }

  return (
    <AppBar position="static">
      <Toolbar className={toolbar}>
        <Typography component="h1" variant="h5">
          <RouterLink className={navLink} to="/">
            GuestBoard
          </RouterLink>
        </Typography>
        {showProfileBar()}
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
