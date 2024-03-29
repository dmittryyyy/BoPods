import { React, useContext, useState } from 'react';
import { ThemeContext } from '../..';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, ORDER_ROUTE } from '../../utils/constants';

import './Header.scss';

export const Header = observer(() => {

  const { user, cart } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setIsAdmin(false);
    localStorage.removeItem('token');
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
              <button onClick={() => navigate(ORDER_ROUTE)}>Профиль</button>
              
              <button onClick={() => navigate(CART_ROUTE)}>Корзина<span
                className={cart.cart.length > 0 ? 'quantityCart' : ''}>
                {cart.countElemInCart ? cart.countElemInCart : cart.cart.length ? cart.cart.length : ''}
              </span></button>

              <button onClick={() => logOut()}>Выйти</button>
            </nav>
          ) : (
            <nav>
              <button onClick={() => navigate(CART_ROUTE)}>Корзина<span
                className={cart.cart.length > 0 ? 'quantityCart' : ''}>
                {cart.countElemInCart ? cart.countElemInCart : ''}
              </span></button>

              <button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</button>
            </nav>
          ))}
        </div>
      </div>
    </header>
  )
});
