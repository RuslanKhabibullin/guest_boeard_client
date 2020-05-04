import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import ProfileIcon from './icons/ProfileIcon'

class UserList extends Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  state = {
    userList: {}
  }

  componentDidMount() {
    const { channel } = this.props

    channel.bind('pusher:subscription_succeeded', members => {
      let memberEntities = {}
      members.each(member => memberEntities[member.id] = member.info)
      this.setState({ userList: memberEntities })
    })
    channel.bind('pusher:member_added', member => {
      const { userList } = this.state
      this.setState({ userList: { ...userList, [member.id]: member.info }})
    })
    channel.bind('pusher:member_removed', member => {
      const { userList } = this.state
      delete userList[member.id]
      this.setState({ userList: userList })
    })
  }

  viewUserList = (userList = this.state.userList) => {
    return Object.entries(userList).map(([memberId, memberInfo]) => {
      return (
        <ListItem key={memberId}>
          <ListItemAvatar>
            <ProfileIcon />
          </ListItemAvatar>
          <ListItemText primary={`${memberInfo.first_name} ${memberInfo.last_name}`} />
        </ListItem>
      )
    })
  }

  render() {
    const { className } = this.props

    return (
      <div className={`${className} card`}>
        <List>{this.viewUserList()}</List>
      </div>
    )
  }
}

export default UserList
