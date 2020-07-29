import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Waypoint } from "react-waypoint"
import { fetchMessagesRequest } from "../requests/message"
import { checkResponseForError } from "../requests/base"
import Message from "./Message"

class MessageList extends Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
  }

  state = {
    isLoading: false,
    isLoaded: false,
    allLoaded: false,
    page: 1,
    messages: []
  }

  componentDidMount() {
    const { channel } = this.props

    channel.bind("message_created", message => {
      this.setState({ messages: [message, ...this.state.messages]})
    })
  }

  rememberMessagesResponseToState = (response) => {
    const { page } = this.state
    const { entities } = response
    if (entities.length === 0) {
      this.setState({
        isLoaded: true,
        allLoaded: true,
        isLoading: false
      })
    } else {
      this.setState({
        isLoading: false,
        isLoaded: true,
        allLoaded: false,
        page: page + 1,
        messages: entities
      })
    }
  }

  loadMessages = () => {
    const { page } = this.state
    const { token } = this.props

    console.log(`Request to /messages?page=${page} fired`)
    fetchMessagesRequest(token, page, 20)
      .then(checkResponseForError)
      .then(this.rememberMessagesResponseToState)
  }

  renderMessages = () => {
    const { messages } = this.state
    return messages.map(message => <Message {...message} key={message.id} />)
  }

  renderWaypoint = () => {
    const { isLoading, allLoaded } = this.state

    if (!isLoading && !allLoaded) return <Waypoint onEnter={this.loadMessages}/>
  }

  render() {
    const { allLoaded } = this.state
    return (
      <div className="messages">
        <div className="messages__infinite-scroll">
          {this.renderMessages()}
          {this.renderWaypoint()}
          { !allLoaded && <p>Loading...</p> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    token: user.authentication.token,
  }
}

export default connect(mapStateToProps)(MessageList)
