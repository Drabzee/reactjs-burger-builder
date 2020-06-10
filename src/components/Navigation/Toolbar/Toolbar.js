import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import style from './Toolbar.module.css';
import Drawer from '../Drawer/Drawer';
import { NavLink } from 'react-router-dom';

const Toolbar = (props) => {

  const [drawerVisibility, toggleDrawer] = useState(false);

  const toggleDrawerHandler = () => {
    toggleDrawer(!drawerVisibility);
  }

  return (
    <Fragment>
      {drawerVisibility ? <Drawer toggleDrawer={toggleDrawerHandler} /> : null}
      <div className={style.toolbar}>
        <button onClick={toggleDrawerHandler} className={style.menuButton}>
          <span className="material-icons">menu</span>
        </button>
        <ul className={style.menu}>
          <NavLink to="/burger" activeClassName={style.active}><li>Burger Builder</li></NavLink>
          { props.isLoggedIn ? <NavLink to="/orders"  activeClassName={style.active}><li>Orders</li></NavLink> : null }
          { !props.isLoggedIn ? <NavLink to="/auth"  activeClassName={style.active}><li>Authentication</li></NavLink> : null }
          { props.isLoggedIn ? <NavLink to="/logout"  activeClassName={style.active}><li>Logout</li></NavLink> : null }
        </ul>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.user.idToken ? true : false
  }
}

export default connect(mapStateToProps, null)(Toolbar);