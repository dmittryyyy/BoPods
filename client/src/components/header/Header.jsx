import React, { useContext } from 'react';
import { ThemeContext } from '../..';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';

import './Header.scss';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../../utils/constants';

export const Header = observer(() => {
  const { user } = useContext(ThemeContext);
  const navigate  = useNavigate();
  return (
    <header>
      <div className="headerWrapper container">
        <div className='logo' variant="dark">
          <Link to='/'><img src="/images/header/logo.jpg" alt="Логотип" /></Link>
          <div className='logoTitle'>
            <h1>BoPods</h1>
            <p>Аксессуары для вашего iPhone</p>
          </div>
        </div>
        <div className="navi">
          {user.isAuth ? (
            <nav>
              <button onClick={() => navigate(ADMIN_ROUTE)}>Администратор</button>
              <button onClick={() => navigate(LOGIN_ROUTE)}>Выйти</button>
            </nav>
          ) : (
            <nav>
              <button onClick={() => user.setIsAuth(true)}>Авторизация</button>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
});
