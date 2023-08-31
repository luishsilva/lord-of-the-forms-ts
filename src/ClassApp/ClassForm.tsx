import React, { Component } from "react";
import  Input  from "./components/TextInput"
import { allCities } from "../utils/all-cities";
import { ErrorMessage } from "../ErrorMessage";
import { isInputLengthValid, isEmailValid } from "../utils/validations"

/* const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";*/
const phoneNumberErrorMessage = "Invalid Phone Number";

const errorMessages = [
  "First name must be at least 2 characters long",
  "Last name must be at least 2 characters long",
  "Email is Invalid",
  "State is Invalid",
  "Invalid Phone Number",
];

const formInput = [
  {label: 'First Name' ,placeholder: 'First Name', name: 'firstName', type:'text'},
  {label: 'Last Name', placeholder: 'Last Name', name: 'lastName', type:'text'},
  {label: 'Email', placeholder: 'exemple@email.com', name: 'email', type:'text'},
  {label: 'City', placeholder: 'City', name: 'city', type:'text'},
  /*{phone:  [
    {'phone-input-1': '55', name: 'phone-input-1', type:'text'},
    {'phone-input-2': '55', name: 'phone-input-2', type:'text'},
    {'phone-input-3': '55', name: 'phone-input-3', type:'text'},
    {'phone-input-4': '5', name: 'phone-input-14', type:'text'},
  ]} */
];

type FormType = {
  isFormSubmitted: boolean;
  inputErrors: string[]
}

export class ClassForm extends Component {
  //Create the form State
  state: FormType = {
    isFormSubmitted: false,
    inputErrors: []
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({
      isFormSubmitted: true,
    })
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'email') {
      if (!isEmailValid(e.target.value)){
        this.addInputErrorValidate(e.target.name);
      } else {
        this.removeInputErrorValidate(e.target.name);
      }
    } 

    if (e.target.name === 'city') {
      if (!allCities.includes(e.target.value)) {
        this.addInputErrorValidate(e.target.name);
      } else {
        this.removeInputErrorValidate(e.target.name);
      }
    }
    
    if (e.target.name !== 'email' && e.target.name !== 'city') {
      if (!isInputLengthValid(e.target.value,2)) {
        this.addInputErrorValidate(e.target.name);
      } else {
        this.removeInputErrorValidate(e.target.name);
      }
    }
  }


  addInputErrorValidate = (inputName: string) => {
    const { inputErrors } = this.state;
    if (!inputErrors.includes(inputName)) {
      inputErrors.push(inputName);
    }
  }

  removeInputErrorValidate = (inputName: string) => {
    const { inputErrors } = this.state;
    inputErrors.splice(inputErrors.indexOf(inputName),1)
  }

  hasError = (inputName: string) => {
    const { isFormSubmitted, inputErrors} = this.state;
    return (isFormSubmitted && inputErrors.find(item => item === inputName) != undefined)  ? true : false
  }


  render() {
    const { isFormSubmitted } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {
          formInput.length && formInput.map((item, index) => (
            <Input 
              key={item.name}
              name={item.name}
              label={item.label}
              type={'text'}
              placeholder={item.placeholder}
              onChange={this.handleInputChange}
              error={errorMessages[index]}
              hasError={this.hasError(item.name)}
            />
          ))
        }
        {/* first name input */}
        {/* <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input 
            placeholder="Bilbo" 
            name="firstName"
            onChange={this.handleInputChange}
          />
        </div>
        <ErrorMessage message={firstNameErrorMessage} show={this.hasError('firstName')} /> */}

        {/* last name input */}
        {/* <div className="input-wrap">
          <label>{"Last Name"}:</label>
          <input placeholder="Baggins"
            name="lastName"
            onChange={this.handleInputChange}
          />
        </div>
        <ErrorMessage message={lastNameErrorMessage} show={this.hasError('lastName')} /> */}

        {/* Email Input */}
        {/* <div className="input-wrap">
          <label>{"Email"}:</label>
          <input 
            name="email"
            placeholder="bilbo-baggins@adventurehobbits.net" 
            onChange={this.handleInputChange}
          />
        </div>
        <ErrorMessage message={emailErrorMessage} show={this.hasError('email')} /> */}

        {/* City Input */}
        {/* <div className="input-wrap">
          <label>{"City"}:</label>
          <input 
            name="city"
            placeholder="Hobbiton" 
            onChange={this.handleInputChange}
          />
        </div>
        <ErrorMessage message={cityErrorMessage} show={this.hasError('city')} /> */}

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input 
              type="text" 
              id="phone-input-1" 
              name="phone-input-1" 
              
              placeholder="55" 
            />
            -
            <input 
              type="text" 
              id="phone-input-2" 
              name="phone-input-2" 
              placeholder="55" 
              onChange={this.handleInputChange}
            />
            -
            <input 
              type="text" 
              id="phone-input-3" 
              name="phone-input-3" 
              placeholder="55" 
              onChange={this.handleInputChange}

            />
            -
            <input 
              type="text" 
              id="phone-input-4" 
              name="phone-input-4" 
              placeholder="5" 
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <ErrorMessage message={phoneNumberErrorMessage} show={isFormSubmitted} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
