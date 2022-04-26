import { React, useContext, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/constants';
import { registration, login } from '../../services/userAPI';
import { ThemeContext } from '../..';

import './Authorisation.scss';

export const Authorisation = observer( () => {
  const { user } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState('')
  const [password, setsetPassword] = useState('')

  const signIn = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        if (email === 'admin@mail.ru') {
          user.setIsAdmin(true);
          console.log(user.isAdmin);
          navigate(ADMIN_ROUTE);
        } else {
          user.setIsAuth(true);
        }
      } else {
        data = await registration(email, password);
        user.setUser(data);
        user.setIsAuth(true);
      }
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message)
    }
  }


  return (
    <div className="containerForm" style={{ height: window.innerHeight - 54 }}>
      <div className="wrapperForm">
        <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <form>
          <input type="email"
            placeholder='Введите E-mail'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input type="password"
            placeholder='Введите пароль'
            value={password}
            onChange={e => setsetPassword(e.target.value)}
          />
        </form>
        <div className="formBottom">
          {isLogin ? (
            <div>
              <p>Нет аккаунта?</p>
              <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
            </div>
          ) : (
            <div>
              <p>Есть аккаунт?</p><Link to={LOGIN_ROUTE}>Выполните вход!</Link>
            </div>
          )}
          <button type='submit' onClick={signIn}>{isLogin ? "Войти" : "Регистрация"}</button>
        </div>
      </div>
    </div>
  )
});
