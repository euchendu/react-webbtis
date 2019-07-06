import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';
import { FirebaseContext } from '../components/Firebase';

const SignUpPage = () => (
  <div className="Signup">
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

const INITIAL_STATE = {
  isLoading: false,
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  validateForm() {
    return this.state.email.length > 0
      && this.state.password.length > 0
      && this.state.password === this.state.confirmPassword;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.signup(this.state.email, this.state.password);
    }
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  signup(email, password) {
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password" />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password" />
        </FormGroup>
        {this.state.error && <p>{this.state.error.message}</p>}
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…" />
      </form>
    );
  }
}

export default withRouter(SignUpPage);

export { SignUpForm };
