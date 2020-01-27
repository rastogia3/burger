import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Buttons } from '../../../components/Layout/UI/Buttons/Buttons';
import './contactData.css';
import Spinner from '../../../components/Layout/UI/Spinner/Spinner';
import { BackDrop } from '../../../components/Layout/UI/Backdrop/Backdrop';
import Input from '../../../components/Layout/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity, createErrorMessage } from '../../../shared/utility';


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your Name',
          type: 'text'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 50,
        },
        touched: false,
        valid: false,
        errorMessage: ''
      },
      address1: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Address 1',
          type: 'text'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false,
        errorMessage: ''
      },
      address2: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Address 2',
          type: 'text'
        },
        value: '',
        validation: {
        },
        touched: false,
        valid: true,
        errorMessage: ''
      },
      city: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'City',
          type: 'text'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false,
        errorMessage: ''
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Zip Code',
          type: 'text'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        touched: false,
        errorMessage: '',
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Email',
          type: 'email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false,
        errorMessage: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          placeholder: 'Select your option',
          options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
        },
        value: '',
        validation: {},
        touched: false,
        valid: false,
        errorMessage: ''
      }
    },
    isFormValid: false

  }

  inputChangedHandler = (event, formIdentifier) => {
    //  
    const updatedFormElement = updateObject(this.state.orderForm[formIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, this.state.orderForm[formIdentifier].validation),
      errorMessage: createErrorMessage(event.target.value, this.state.orderForm[formIdentifier].validation)
    })

    const updatedFormData = updateObject(this.state.orderForm, {
      [formIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (const key in updatedFormData) {
      formIsValid = updatedFormData[key].valid && formIsValid;
    }
    this.setState({ orderForm: updatedFormData, isFormValid: formIsValid });
  }
  orderHandler = (e) => {
    e.preventDefault();
    const customerForm = {};
    for (const key in this.state.orderForm) {
      customerForm[key] = this.state.orderForm[key].value;
    }
    const order = {
      orderDate: new Date(),
      ingredients: this.props.ings,
      totalPrice: this.props.totalPrice,
      customerInfo: customerForm,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);

  }
  render() {
    const FormElementArray = [];
    for (const key in this.state.orderForm) {
      FormElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    return (
      <>
        <Spinner show={this.props.loading} />
        <BackDrop show={this.props.loading} />
        <div className="ContactForm">
          <h4>Enter your Contact Data</h4>
          <form onSubmit={this.orderHandler}>

            {
              FormElementArray.map(e => <Input
                key={e.id}
                changed={(event) => this.inputChangedHandler(event, e.id)}
                elementType={e.config.elementType}
                config={e.config.elementConfig}
                value={e.config.value}
                errorMessage={e.config.errorMessage}
                invalid={!e.config.valid}
                validation={e.config.validation}
                touched={e.config.touched} />)
            }

            <div className="ButtonGroup">
              <Buttons type="submit" makeDisable={!this.state.isFormValid} class="Success">Order Now</Buttons>
            </div>
          </form>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.orderReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token, userId) => dispatch(actions.purchaseBurger(orderData, token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));