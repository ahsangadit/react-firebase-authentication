import React from 'react';
import {withAuthorization, AuthUserContext} from '../Session'; 
const Home = () => (
  <div>
    <h1>Welcome </h1>
    <p> Home Page is accessible by sign in users </p>
  </div>
);
const condition = authUser => !!authUser
export default withAuthorization(condition)(Home);