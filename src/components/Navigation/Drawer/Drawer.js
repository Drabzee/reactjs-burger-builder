import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import logoPic from '../../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Drawer = (props) => {
  return (
    <Fragment>
      <Backdrop />
      <div className={style.drawer}>
        <div className={style.header}>
          <span onClick={props.toggleDrawer} className={"material-icons "+style.closeIcon}>close</span>
          <img src={logoPic} width="150" alt="Logo"/>
          <h1>Menu</h1>
        </div>
        <ul className={style.menu}>
          <NavLink to="/burger" activeClassName={style.active}><li onClick={props.toggleDrawer}>Burger Builder</li></NavLink>
          { props.isLoggedIn ? <NavLink to="/orders" activeClassName={style.active}><li onClick={props.toggleDrawer}>Orders</li></NavLink> : null }
          { props.isLoggedIn ? <NavLink to="/logout" activeClassName={style.active}><li onClick={props.toggleDrawer}>Logout</li></NavLink> : null }
          { !props.isLoggedIn ? <NavLink to="/auth" activeClassName={style.active}><li onClick={props.toggleDrawer}>Authentication</li></NavLink> : null }
        </ul>
      </div>
    </Fragment>
  );
}

Drawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.user.idToken ? true : false
  }
}

export default connect(mapStateToProps, null)(Drawer);