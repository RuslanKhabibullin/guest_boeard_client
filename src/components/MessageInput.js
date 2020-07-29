import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { createMessageRequest } from "../requests/message"
import { checkResponseForError } from "../requests/base"

class MessageInput extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired
  }

  state = {
    text: ""
  }

  setText = (e) => {
    this.setState({ text: e.target.value })
  }

  onKeyPressed = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      this.addMessage()
    }
  }

  addMessage = () => {
    const { text } = this.state
    const { token } = this.props

    createMessageRequest(token, text)
      .then(checkResponseForError)
      .then((_) => this.setState({ text: "" }))
  }

  render() {
    const { text } = this.state
    return (
      <textarea
        className="messages__input"
        placeholder="Message text"
        rows="5"
        onChange={this.setText}
        onKeyDown={this.onKeyPressed}
        value={text}
      />
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    token: user.authentication.token,
  }
}

export default connect(mapStateToProps)(MessageInput)
