import React, { Component, RefObject, } from "react";
import  TextInput  from "./components/TextInput"
import { allCities } from "../utils/all-cities";
import { ErrorMessage } from "../ErrorMessage";
import { isInputLengthValid, isEmailValid } from "../utils/validations"

const errorMessages = [
  "First name must be at least 2 characters long",
  "Last name must be at least 2 characters long",
  "Email is Invalid",
  "State is Invalid",
];
const phoneNumberErrorMessage = "Invalid Phone Number";

const formInput = [
  {label: 'First Name' ,placeholder: 'First Name', name: 'firstName', type:'text'},
  {label: 'Last Name', placeholder: 'Last Name', name: 'lastName', type:'text'},
  {label: 'Email', placeholder: 'exemple@email.com', name: 'email', type:'text'},
  {label: 'City', placeholder: 'City', name: 'city', type:'text'},
];

type FormType = {
  isFormSubmitted: boolean;
  inputErrors: string[],
  phoneInputState: string[],
  refs: RefObject<HTMLInputElement>[];
}
export class ClassForm extends Component {
  //Create the form State
  state: FormType = {
    isFormSubmitted: false,
    inputErrors: [],
    phoneInputState: ["", "", "", ""],
    refs: [React.createRef(), React.createRef(), React.createRef(), React.createRef()]
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

    console.log(e.target.name)

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

  handlePhoneInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = this.state.refs[index + 1];
    const prevRef = this.state.refs[index - 1];
    const value = e.target.value;
    const shouldGoToNextRef = currentMaxLength === value.length;
    const shouldGoToPrevRef = value.length === 0;

    if (shouldGoToNextRef) {
      if (nextRef !== undefined) {
        nextRef.current?.focus();
      }
    }

    if (shouldGoToPrevRef) {
      if (prevRef !== undefined) {
        prevRef.current?.focus();
      }
    }

    const newState = this.state.phoneInputState.map((phoneInput, phoneInputIndex) => 
      index === phoneInputIndex ? e.target.value : phoneInput
    );

    this.setState({
      phoneInputState : newState,
    })
    
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
            <TextInput 
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

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"
              placeholder="55"
              maxLength={2}
              onChange={this.handlePhoneInputChange(0)}
              ref={this.state.refs[0]}
            />
            -
            <input
              type="text"
              id="phone-input-2"
              placeholder="55"
              maxLength={2}
              onChange={this.handlePhoneInputChange(1)}
              ref={this.state.refs[1]}
            />
            -
            <input
              type="text"
              id="phone-input-3"
              placeholder="55"
              maxLength={2}
              onChange={this.handlePhoneInputChange(2)}
              ref={this.state.refs[2]}
            />
            -
            <input
              type="text"
              id="phone-input-4"
              placeholder="5"
              maxLength={1}
              onChange={this.handlePhoneInputChange(3)}
              ref={this.state.refs[3]}
            />
          </div>
        </div>

        <ErrorMessage message={phoneNumberErrorMessage} show={isFormSubmitted} />


        <input type="submit" value="Submit" />
      </form>
    );
  }
}
