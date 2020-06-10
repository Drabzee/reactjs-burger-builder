import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import style from './SignUser.module.css';
import { login, resetError, register } from '../../redux';
import Loader from '../../components/UI/Loader/Loader';
import transformText from '../../utils/tranformText';

const SignUser = (props) => {

  if(props.loggedIn) props.history.goBack();

  let formRef = null;

  const [authMode, setAuthMode] = useState('login');

  const userCredentials = {};

  const formSubmitHandler = (event) => {
    event.preventDefault();
    formRef.reset();
    if(authMode === 'register') {
      props.register({
        ...userCredentials
      });
    } else {
      props.login({
        email: userCredentials.email,
        password: userCredentials.password
      });
    }
  }

  return  (
    <div className={style.signUser}>
      { props.loading ? <Loader /> : null }
      <form ref={ref => formRef = ref} onSubmit={formSubmitHandler} className={style.form} autoComplete="off">

        { props.error
           ? <div className={style.error} id="error">
              {transformText(props.error)}
              <span onClick={props.resetError} className="material-icons" id="close">close</span>
            </div> : null
        }

        <h1 className={style.heading}>{authMode === 'login' ? 'Login' : 'Register'}</h1>
        {authMode === 'register'
          ? (<Fragment>
              <div className={style.formGroup}>
                <label className={style.label} htmlFor="name">Name</label>
                <input onChange={(event) => userCredentials.name = event.target.value} className={style.input} type="text" id="name" placeholder="Enter name" required />
              </div>
              <div className={style.formGroup}>
                <label className={style.label} htmlFor="Mobile">Mobile</label>
                <input onChange={(event) => userCredentials.mobile = event.target.value} className={style.input} type="text" id="mobile" minLength="10" maxLength="10" placeholder="Enter mobile" required />
              </div>
              <div className={style.formGroup}>
                <label className={style.label} htmlFor="address">Address</label>
                <input onChange={(event) => userCredentials.address = event.target.value} className={style.input} type="text" id="address" placeholder="Enter address" required />
              </div>
            </Fragment>) : null}
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="email">Email</label>
          <input onChange={(event) => userCredentials.email = event.target.value} className={style.input} type="email" id="email" placeholder="Enter email" required />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="password">Password</label>
          <input onChange={(event) => userCredentials.password = event.target.value} className={style.input} type="password" minLength="6" id="password" placeholder="Enter password" required />
        </div>
        <p className={style.desc}>
          {authMode === 'login' ? 'Already have an account?' : 'Don\'t have any account?'}
          { authMode === 'login'
            ? <span onClick={() => setAuthMode('register')}>Register</span>
            : <span onClick={() => setAuthMode('login')}>Login</span> }
        </p>
        <button className={style.button} type="submit">
          {authMode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    loggedIn: state.auth.user.idToken ? true : false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (credentials) => dispatch(login(credentials)),
    register: (credentials) => dispatch(register(credentials)),
    resetError: () => dispatch(resetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUser);
