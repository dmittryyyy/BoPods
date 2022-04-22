import { React } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';
import './Authorisation.scss';
export const Authorisation = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <div className="containerForm" style={{ height: window.innerHeight - 54 }}>
      <div className="wrapperForm">
        <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <form>
          <input type="email" placeholder='Введите E-mail' />
          <input type="password" placeholder='Введите пароль' />
        </form>
        <div className="formBottom">
          {isLogin ?(
            <div>
              <p>Нет аккаунта?</p>
              <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
            </div>
          ):(
            <div>
              <p>Есть аккаунт?</p><Link to={LOGIN_ROUTE}>Выполните вход!</Link>
            </div>
          )}
            <button>{isLogin ? "Войти" : "Зарегистрироваться"}</button>
        </div>
      </div>
    </div>
  )
}
