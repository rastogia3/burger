import React, { Component } from 'react';
import { updateObject, checkValidity, createErrorMessage } from "../../shared/utility";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import Input from "../../components/Layout/UI/Input/Input";
import { Buttons } from "../../components/Layout/UI/Buttons/Buttons";
import "./profile.css"



class Profile extends Component {

  componentDidMount() {
    document.body.classList.add('auth');
  }
  componentWillUnmount() {
    document.body.classList.remove('auth');

  }
  
  state = {
    profileForm: {
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
      }
    },
    isFormValid: false

  }

  inputChangedHandler = (event, formIdentifier) => {
    //  
    const updatedFormElement = updateObject(this.state.profileForm[formIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, this.state.profileForm[formIdentifier].validation),
      errorMessage: createErrorMessage(event.target.value, this.state.profileForm[formIdentifier].validation)
    })

    const updatedFormData = updateObject(this.state.profileForm, {
      [formIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (const key in updatedFormData) {
      formIsValid = updatedFormData[key].valid && formIsValid;
    }
    this.setState({ profileForm: updatedFormData, isFormValid: formIsValid });
  }
  profileHandler = (e) => {
    e.preventDefault();
    const customerForm = {};
    for (const key in this.state.profileForm) {
      customerForm[key] = this.state.profileForm[key].value;
    }
    const order = {
      orderDate: new Date(),
      customerInfo: customerForm
    }
    console.log(order)
  //  this.props.onOrderBurger(order, this.props.token);

  }
  render() {
    const FormElementArray = [];
    for (const key in this.state.profileForm) {
      FormElementArray.push({
        id: key,
        config: this.state.profileForm[key]
      })
    }
    return (
      <>
        <div className="profileContainer">
          <h3>Update My Profile</h3>
          <form onSubmit={this.profileHandler}>
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
              <Buttons type="submit" makeDisable={!this.state.isFormValid} class="Success">Update My Profile</Buttons>
            </div>
          </form>
        </div>
      </>
    )
  }
}


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));
