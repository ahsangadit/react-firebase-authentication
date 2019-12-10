import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const Navigation = ({ authUser }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
<div>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">React With Firebase</a>


  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to={ROUTES.LANDING}>LANDING</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to={ROUTES.HOME}>HOME</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to={ROUTES.ACCOUNT}>ACCOUNT</Link>
      </li>

      <li>
      {NavigationAuth}
      </li>
      <li>
        <SignOutButton />
      </li>
  </ul>
  </div>
</nav> 
</div>
  );

const NavigationNonAuth = () => (
  <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">React With Firebase</a>


  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to={ROUTES.LANDING}>LANDING</Link>
      </li>

  </ul>
  </div>
</nav> 
</div>
);

export default Navigation;