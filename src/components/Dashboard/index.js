import React, { Component } from 'react'
import authorizedOnly from '../../decorators/authorizedOnly'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserList from '../UserList'
import Pusher from 'pusher-js'
import { CHANNEL_NAME, BASE_URL } from '../../constants'
import Loader from '../Loader'
import './styles.css'

class Dashboard extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired
  }

  state = {
    channel: null
  }

  componentDidMount() {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      authEndpoint: BASE_URL + '/pusher/authenticate',
      cluster: 'ap2',
      auth: {
        headers: { Authorization: `Bearer ${this.props.token}` }
      }
    })

    this.setState({ channel: pusher.subscribe(CHANNEL_NAME) })
  }

  componentWillUnmount() {
    const pusher = this.state.channel.pusher
    pusher.unsubscribe(CHANNEL_NAME)
  }

  render() {
    const { channel } = this.state
    if (!channel) return <Loader />

    return (
      <div className="dashboard">
        <UserList channel={channel} className="dashboard__card" />
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { token: user.authentication.token }
}

export default authorizedOnly(connect(mapStateToProps)(Dashboard))
