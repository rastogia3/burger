import React, { Component } from 'react';
import Input from '../../components/Layout/UI/Input/Input';
import { Buttons } from "../../components/Layout/UI/Buttons/Buttons";
import "./Auth.css"
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import { BackDrop } from '../../components/Layout/UI/Backdrop/Backdrop';
import { Redirect } from "react-router-dom"
import { updateObject, checkValidity, createErrorMessage } from "../../shared/utility"
class Auth extends Component {

  componentDidMount() {
    document.body.classList.add('auth');
    if (!this.props.building && this.props.authRedirect !== "/") {
      this.props.onsetAuthRedirectPath('/')
    }
  }
  componentWillUnmount() {
    document.body.classList.remove('auth');

  }
  state = {
    loginForm: {
      login: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your Login Id',
          type: 'email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        touched: false,
        errorMessage: '',
        valid: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your password',
          type: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 12
        },
        valid: false,
        errorMessage: '',
        touched: false
      }
    },
    isFormValid: false,
    isSignIn: false
  }

  inputChangedHandler = (event, formIdentifier) => {
    const updatedFormElement = updateObject(this.state.loginForm[formIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, this.state.loginForm[formIdentifier].validation),
      errorMessage: createErrorMessage(event.target.value, this.state.loginForm[formIdentifier].validation)
    })

    const updatedFormData = updateObject(this.state.loginForm, {
      [formIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (const key in updatedFormData) {
      formIsValid = updatedFormData[key].valid && formIsValid;
    }
    this.setState({ loginForm: updatedFormData, isFormValid: formIsValid });
  }

  loginHandler = (e) => {
    e.preventDefault();
    this.props.onLogin(this.state.loginForm.login.value, this.state.loginForm.password.value, this.state.isSignIn);
  }
  switchPanelHandler = () => {
    this.setState(prevState => {
      return { isSignIn: !prevState.isSignIn }
    })
  }

  render() {
    const formElementArray = [];
    for (const key in this.state.loginForm) {
      formElementArray.push({
        id: key, config: this.state.loginForm[key]
      })
    }
    const redirectToHome = this.props.token ?
      <Redirect to={this.props.authRedirect} />
      : null;
    const errorMessageDisplay = this.props.error ? <h3>{this.props.error}</h3> : null;
    const loadModule = this.props.loading ? (
      <>
        <Spinner show /> <BackDrop show />
      </>
    ) :
      <div className="loginContainer">
        {redirectToHome}
        <h4>Login</h4>
        {errorMessageDisplay}
        <form onSubmit={this.loginHandler}>
          {formElementArray.map(e => <Input
            key={e.id}
            changed={(event) => this.inputChangedHandler(event, e.id)}
            elementType={e.config.elementType}
            config={e.config.elementConfig}
            validation={e.config.validation}
            value={e.config.value}
            invalid={!e.config.valid}
            errorMessage={e.config.errorMessage}
            touched={e.config.touched} />)}
          <div className="ButtonGroup">
            <Buttons type="submit" makeDisable={!this.state.isFormValid} class="Success">Sign {this.state.isSignIn ? 'In' : 'Up'}</Buttons>
            <Buttons type="button" clicked={this.switchPanelHandler} class="Success">Switch to Sign {!this.state.isSignIn ? 'In' : 'Up'}</Buttons>
          </div>
        </form>

      </div>;
    return loadModule
      ;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    error: state.auth.error,
    userId: state.auth.userId,
    building: state.burgerBuilder.building,
    authRedirect: state.auth.authRedirect
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn)),
    onsetAuthRedirectPath: (path) => dispatch(actions.afterAuthChecked(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);