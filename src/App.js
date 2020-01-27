import React from 'react'
import Layout from './components/Layout/Layout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from "./store/actions/index"
import asyncComponent from "./asyncComponent/asyncComponent";
import Profile from './containers/Profile/Profile';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/CheckOut/CheckOut');
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})


class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));