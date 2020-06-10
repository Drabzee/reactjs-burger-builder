import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildController from '../../components/BuildControllers/BuildController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Checkout from '../../components/Checkout/Checkout';
import { Route, Redirect,  } from 'react-router-dom';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {

  state = {
    showOrderModal: false,
  }

  toggleOrderModalHandler = () => {
    this.setState({
      showOrderModal: !this.state.showOrderModal
    });
  }

  render() {
    return (
      <Fragment>
        <Route path="/burger" render={(props) => (
          <Modal hidden={!this.state.showOrderModal}>
            <OrderSummary
              {...props}
              toggleOrderModal = {this.toggleOrderModalHandler} />
          </Modal>
        )} />
        <Route path="/burger" component={Burger} />
        <Route path="/burger" render={() => (
          <BuildController
            toggleOrderModal = {this.toggleOrderModalHandler} />
        )} exact />
        <Route path="/burger/checkout" exact render={() => this.props.isLoggedIn ? <Checkout {...this.props} /> : <Redirect to='/auth' />} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.user.idToken ? true : false
  }
}

export default connect(mapStateToProps, null)(BurgerBuilder);