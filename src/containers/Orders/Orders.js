import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from './Orders.module.css';
import axios from '../../utils/axios/db';
import Order from './Order/Order';
import Loader from '../../components/UI/Loader/Loader';
import emptyOrderPic from '../../assets/empty-orders.png';

const Orders = (props) => {

  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/orders/${props.localId}.json?auth=${props.idToken}`);
        const orderList = [];
        for(let key in res.data) {
          const order = {};
          order.id = key;
          order.name = res.data[key].name;
          order.email = res.data[key].email;
          order.mobile = res.data[key].mobile;
          order.address = res.data[key].address;
          order.price = res.data[key].price;
          order.ingredients = res.data[key].ingredients;
          orderList.push(order);
        }
        orderList.reverse();
        setOrders(orderList);
      } catch(err) {
        setError(err.response ? err.response.data.error : err.message);
      }
    })();
  }, [props.localId, props.idToken]);

  let ordersDom = orders ? orders.map(order => {
    return <Order key={order.id} {...order} />;
  }) : null;

  return error 
    ? <h1 style={{marginTop: 100, textAlign: 'center'}}>{error}</h1>
    : orders 
      ? ( <div className={style.orders}>
            <h1 className={style.heading}>Orders</h1>
            {orders.length > 0
              ? <div className={style.orderList}>
                  {ordersDom}
                </div>
              : <img className={style.emptyOrderPic} src={emptyOrderPic} alt="Empty orders" />}
          </div>
      ) : <Loader />;
};

const mapStateTopProps = state => {
  return {
    localId: state.auth.user.localId,
    idToken: state.auth.user.idToken
  }
}

export default connect(mapStateTopProps, null)(Orders);
