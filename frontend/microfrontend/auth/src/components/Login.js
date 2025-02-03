import React, {useEffect} from 'react';

import '../blocks/login/login.css';
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

import '../index.css'

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  useEffect(() => {
    addEventListener("popup-closed", closeToolTip);
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
          .checkToken(token)
          .then((res) => {
            sendLoggedInEvent();
          })
          .catch((err) => {
            localStorage.removeItem("jwt");
            console.log(err);
          });
    }
    return () => removeEventListener("popup-closed", closeToolTip);
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }

  function onLogin({ email, password }) {
    auth
        .login(email, password)
        .then((res) => {
          sendLoggedInEvent();
        })
        .catch((err) => {
          setTooltipStatus("fail");
          setIsInfoToolTipOpen(true);
        });
  }

  function sendClosedEvent() {
    dispatchEvent(new CustomEvent("popup-closed", {
      detail: true
    }));
  }

  function sendLoggedInEvent(res) {
    dispatchEvent(new CustomEvent("user-logged", {}));
  }

  function closeToolTip() {
    setIsInfoToolTipOpen(false);
  }

  return (
    <>
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Войти</button>
      </form>
    </div>
    <InfoTooltip isOpen={isInfoToolTipOpen} onClose={sendClosedEvent} status={tooltipStatus}/>
    </>
  )
}

export default Login;
