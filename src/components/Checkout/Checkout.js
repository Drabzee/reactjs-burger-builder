import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { resetBurger } from '../../redux';
import style from './Checkout.module.css';
import axios from '../../utils/axios/db';
import Loader from '../UI/Loader/Loader'
import Modal from '../UI/Modal/Modal';

class Checkout extends Component {

  formRef = null;

  state = {
    order: {
      name: this.props.user.name,
      email: this.props.user.email,
      mobile: this.props.user.mobile,
      address: this.props.user.address,
      ingredients: {
        ...this.props.burger.ingredients
      },
      price: this.props.burger.totalPrice.toFixed(2)
    },
    loading: false,
    error: ''
  }

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({loading: true});
    this.formRef.reset();
    try {
      await axios.post(`/orders/${this.props.user.localId}.json?auth=${this.props.user.idToken}`, this.state.order);
      this.props.resetBurger();
      this.props.history.replace('/orders');
    } catch(err) {
      this.setState({loading: false});
      this.setState({error: err.response ? err.response.data.error : err.message});
    }
  }

  render() {
    return (
      <Fragment>
       {this.state.loading ? <Loader withBackdrop /> : null}
       {this.state.error ? <Modal hidden={false}><h2 style={{textAlign: 'center'}}>{this.state.error}</h2></Modal> : null}
       <div className={style.checkout}>
         <h1 className={style.heading}>CHECKOUT</h1>
         <form ref={ref => this.formRef = ref} onSubmit={this.orderHandler} className={style.form}>
           <div className={style.formGrp}>
             <label htmlFor="name" className={style.label}>Full Name</label>
             <input
              type = "text"
              className = {style.input}
              name = "name"
              value = {this.props.user.name}
              placeholder="Enter name" required readOnly />
          </div>
          <div className={style.formGrp}>
            <label htmlFor="email" className={style.label}>Email</label>
            <input
              type = "email"
              className = {style.input}
              name = "email"
              value = {this.props.user.email}
              placeholder = "Enter email" required readOnly/>
          </div>
          <div className={style.formGrp}>
            <label htmlFor="mobile" className={style.label}>Mobile</label>
            <input
              onChange = {(event) => this.setState({order: {...this.state.order, mobile: event.target.value}})}
              type = "text"
              className = {style.input}
              name = "mobile"
              minLength = "10"
              maxLength = "10"
              value = {this.state.order.mobile}
              placeholder = "Enter mobile no." required />
          </div>
          <div className={style.formGrp}>
            <label htmlFor="address" className={style.label}>Address</label>
            <input
              onChange = {(event) => this.setState({order: {...this.state.order, address: event.target.value}})}
              type = "text"
              className = {style.input}
              name = "address"
              value = {this.state.order.address}
              placeholder = "Enter address" required />
          </div>
          <button onClick={this.orderHandler} className={style.orderButton} disabled={this.props.burger.totalIngredients === 0}>ORDER NOW</button>
        </form>
      </div>
    </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    burger: state.burger,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetBurger: () => dispatch(resetBurger())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);