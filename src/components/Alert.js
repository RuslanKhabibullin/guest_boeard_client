import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert as MaterialAlert, AlertTitle } from '@material-ui/lab/'
import { connect } from 'react-redux'

class Alert extends Component {
  state = {
    hidden: false
  }

  static propTypes = {
    error: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    if (this.decoratedErrorMessage(prevProps) !== this.decoratedErrorMessage(this.props) && this.state.hidden) {
      this.setState({ hidden: false })
    } else if (!this.state.hidden) {
      setTimeout(this.setState.bind(this), 8000, { hidden: true })
    }
  }

  decoratedErrorMessage = ({ error }) => {
    return Object.entries(error).reduce((stringErrors, [name, errors]) => {
      if (name === 'base') return [...stringErrors, errors]
      
      return Object.entries(errors).reduce((nested_errors, [nestedName, nestedErrors]) => {
        return [...nested_errors, `${name} ${nestedName} ${nestedErrors.join(",")}`]
      }, [])
    }, []).join(",")
  }

  closeAlert = () => this.setState({ hidden: true })

  render() {
    const message = this.decoratedErrorMessage(this.props)
    const { hidden } = this.state

    if (!message || hidden) return null

    return(
      <MaterialAlert onClose={this.closeAlert} severity='error'>
        <AlertTitle>Error</AlertTitle>
        {message}
      </MaterialAlert>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { error: user.error }
}

export default connect(mapStateToProps)(Alert)
