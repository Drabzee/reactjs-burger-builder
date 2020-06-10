import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import SignUser from './containers/SignUser/SignUser';
import Logout from './containers/Logout/Logout';

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/burger" />} />
            <Route path="/burger" component={BurgerBuilder} />
            { props.isLoggedIn ? <Route path="/orders" component={Orders} /> : null }
            { !props.isLoggedIn ? <Route path="/auth" component={SignUser} /> : null }
            { props.isLoggedIn ? <Route path="/logout" component={Logout} /> : null }
            <Redirect to="/burger"/>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.user.idToken ? true : false
  }
}

export default connect(mapStateToProps, null)(App);