import React, {useEffect} from 'react';
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import '../index.css'

function Register () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  useEffect(() => {
    addEventListener("popup-closed", closeToolTip);
    return () => removeEventListener("popup-closed", closeToolTip);
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onRegister(userData);
  }

  function onRegister({ email, password }) {
    auth
        .register(email, password)
        .then((res) => {
          setTooltipStatus("success");
          setIsInfoToolTipOpen(true);
          dispatchEvent(new CustomEvent("auth-registered", {
            detail: res
          }));
        })
        .catch((err) => {
          setTooltipStatus("fail");
          setIsInfoToolTipOpen(true);
          console.log(err);
        });
  }

  function sendClosedEvent() {
    dispatchEvent(new CustomEvent("popup-closed", {
      detail: true
    }));
  }

  function closeToolTip() {
    setIsInfoToolTipOpen(false);
  }

  return (
    <>
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Регистрация</h3>
          <label className="auth-form__input">
            <input type="text" name="email" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">Зарегистрироваться</button>
        </div>
      </form>
    </div>
      <InfoTooltip isOpen={isInfoToolTipOpen} onClose={sendClosedEvent} status={tooltipStatus}/>
    </>
  )
}

export default Register;
