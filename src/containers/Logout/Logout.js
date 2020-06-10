import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';
import { logout } from '../../redux';

class Logout extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.logout();
      this.props.history.replace('/burger');
    }, 1000)
  }

  render() {
    return (
      <Loader />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);