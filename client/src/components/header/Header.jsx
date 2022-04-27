import React, { useContext } from 'react';
import { ThemeContext } from '../..';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';

import './Header.scss';
import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE } from '../../utils/constants';

export const Header = observer(() => {
  const { user } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setIsAdmin(false);
    localStorage.clear();
  }

  return (
    <header>
      <div className="headerWrapper container">
        <div className='headerLeft'>
          <Link to='/'><img src="/images/header/logo.png" alt="Логотип" /></Link>
          <div className="headerTitle">
            <h1>BoPods</h1>
            <h3>Аксессуары для вашего iPhone</h3>
          </div>
        </div>
        <div className="headerRight">
          {user.isAdmin ? (
            <nav>
              <button onClick={() => navigate(ADMIN_ROUTE)}>Администратор</button>
              <button onClick={() => logOut()}>Выйти</button>
            </nav>
          ) : (user.isAuth ? (
            <nav>
              <button onClick={() => navigate(CART_ROUTE)}>Корзина</button>
              <button onClick={() => logOut()}>Выйти</button>
            </nav>
          ) : (
            <nav>
              <button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</button>
            </nav>
          ))}
        </div>
      </div>
    </header>
  )
});
