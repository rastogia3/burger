import React, { Component } from 'react'
import Order from '../../components/Order/order'
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import { BackDrop } from '../../components/Layout/UI/Backdrop/Backdrop';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {

  componentDidMount() {
    this.fetchOrderfromServer();
  }

  fetchOrderfromServer = () => {
    if (this.props.token) {
      this.props.onFetchOrders(this.props.token, this.props.userId);
    }
  }

  render() {
    const orderDisplay = !this.props.loading ? this.props.orders.length > 0 ? this.props.orders.map(e => <Order
      key={e.id}
      ingredients={e.ingredients}
      client={e.customerInfo}
      delivery={e.customerInfo.deliveryMethod}
      price={+e.totalPrice}
      orderDate={e.orderDate} />) : <h2>You are not authorized to view orders.</h2> : null;
    return (
      <>
        <Spinner show={this.props.loading} />
        <BackDrop show={this.props.loading} />
        {orderDisplay}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => { dispatch(actions.fetchOrders(token, userId)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);