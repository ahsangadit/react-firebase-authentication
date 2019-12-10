import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
 import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {withAuthorization, AuthUserContext} from '../Session'

const SignIn = () => (
  <div>
    <div className="form-group col-md-4">
    <h1>SignIn</h1>
    </div>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

onSubmit = event => {
  const { email, password } = this.state;
  this.props.firebase
    .doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({ error });
    });
  event.preventDefault();
};

onChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};

render(){

  const { email, password, error } = this.state;
  const isInvalid = password === '' || email === '';

  return (

    <form onSubmit={this.onSubmit}>
       <div className="form-group col-md-4">
        <label for="email">Email address:</label>
      <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
        className="form-control input-sm"
      />
        </div>
       <div className="form-group col-md-4">
      <input
        name="password"
        value={password}
        onChange={this.onChange}
        type="password"
        placeholder="Password"
        className="form-control input-sm"
      />
      </div>
      <div className="form-group col-md-4">
      <button disabled={isInvalid} className="btn btn-primary pull-right" type="submit">
        Sign In
      </button>
      </div>
      {error && <p>{error.message}</p>}
    </form>

  );
}
}
const condition = AuthUser => !!AuthUser
const SignInForm = compose(
withRouter,
withFirebase,
)(SignInFormBase);
 export default withAuthorization(condition)(SignIn);
export { SignInForm };