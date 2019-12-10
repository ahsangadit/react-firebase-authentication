import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { withAuthorization, AuthUserContext } from '../Session';

const SignUp = () => (
  <div>
  <div className="form-group col-md-6">
    <h1>SignUp</h1>
    </div>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
    {/* <SignUpForm/> */}
  </div>
);
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    // const roles = {};

    // if (isAdmin) {
    //   roles[ROLES.ADMIN] = ROLES.ADMIN;
    // }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          // roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
      const {
        username,
        email,
        passwordOne,
        passwordTwo,
         isAdmin,
        error,
      } = this.state;
  
      const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';
  
      return (
        <form onSubmit={this.onSubmit}>
           <div className="form-group col-md-6">
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
            className="form-control input-sm"
          />
          </div>
          <div className="form-group col-md-6">
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            className="form-control input-sm"
          />
          </div>
           <div className="form-group col-md-6">
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            className="form-control input-sm"
          />
          </div>
           <div className="form-group col-md-6">
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
            className="form-control input-sm"
          />
          <label className="checkbox-inline">
            Admin:
            <input
              name="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={this.onChangeCheckbox}
            />
          </label>
          </div>
          <div className="form-group col-md-6">
          <button className="btn btn-success pull-right" disabled={isInvalid} type="submit">
            Sign Up
          </button>
          </div>
  
          {error && <p>{error.message}</p>}
        </form>
    );
  }
}

const SignUpLink = () => (
  <div className="form-group col-md-4 align-items-center">
  <p>
    Do u have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
  </div>
);

const condition = AuthUser => !!AuthUser
const SignUpForm = compose(
  withFirebase,
)(SignUpFormBase);
export default withAuthorization(condition)(SignUp);
export { SignUpForm, SignUpLink};