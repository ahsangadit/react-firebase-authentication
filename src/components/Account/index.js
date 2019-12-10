import React from 'react';
import {withAuthorization, AuthUserContext} from '../Session'
const Account = () => (
  <div>
    <h1>Account</h1>
    <p> Home Page is accessible by sign in users </p>
  </div>
);
const condition = AuthUser => !!AuthUser
export default withAuthorization(condition)(Account);