import React from 'react';
import style from './Order.module.css';

const Order = (props) => {

  return (
    <div className={style.order}>
      <span className={style.orderID}>Order ID : <strong>{props.id}</strong></span>
      <div className={style.orderData}>
        <div className={style.orderRow}>
          <h4>Name:</h4>
          <p>{props.name}</p>
        </div>
        <div className={style.orderRow}>
          <h4>Email:</h4>
          <p>{props.email}</p>
        </div>
        <div className={style.orderRow}>
          <h4>Mobile No:</h4>
          <p>{props.mobile}</p>
        </div>
        <div className={style.orderRow}>
          <h4>Address:</h4>
          <p>{props.address}</p>
        </div>
        <div className={style.orderRow}>
          <h4>Price:</h4>
          <p>${props.price}</p>
        </div>
        <div className={style.orderRow}>
          <h4>Ingredients:</h4>
          <ul className={style.ingredients}>
            <li>Cheese : {props.ingredients.cheese}</li>
            <li>Bacon : {props.ingredients.bacon}</li>
            <li>Meat : {props.ingredients.meat}</li>
            <li>Salad : {props.ingredients.salad}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Order
