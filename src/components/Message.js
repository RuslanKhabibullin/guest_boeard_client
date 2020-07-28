import React from "react"
import PropTypes from "prop-types"
import ProfileIcon from "./icons/ProfileIcon"

function Message({ id, content, user }) {
  return (
    <div className="messages__card" key={id}>
      <div className="messages__photo">
        <ProfileIcon fontSize="large"/>
      </div>
      <div className="messages__content">
        <span className="text content--primary">{`${user.first_name} ${user.last_name}`}</span>
        <span className="text content--secondary">{content}</span>
      </div>
    </div>
  )
}

Message.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired
  }).isRequired
}

export default Message
