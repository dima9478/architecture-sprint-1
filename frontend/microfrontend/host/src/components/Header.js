import React, {lazy} from 'react';
import { Route, Link } from 'react-router-dom';
import logoPath from '../images/logo.svg';

const SignOutButton = lazy(() => import('auth/SignOutButton').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
}));

function Header ({ email }) {
  return (
    <header className="header page__section">
      <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo" />
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user">{ email }</p>
          <SignOutButton className="header__logout" />
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__auth-link" to="signin">Войти</Link>
      </Route>
      <Route path="/signin">
        <Link className="header__auth-link" to="signup">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;
