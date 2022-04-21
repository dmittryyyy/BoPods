import React, { useContext } from 'react';
import { ThemeContext } from '../..';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './Header.scss';

export const Header = observer(() => {
  const { user } = useContext(ThemeContext);
  return (
    <header>
      <div className="headerWrapper container">
      <div className='logo' variant="dark">
        <Link to='/'><img src="/images/header/logo.jpg" alt="Логотип" /></Link>
        <h1>BoPods</h1>
        </div>
        <div className="navi">
          {user.isAuth ? (
            <nav>
              <button>Администратор</button>
              <button>Выйти</button>
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
