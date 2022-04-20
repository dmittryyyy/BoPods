import React, { useContext } from 'react';
import { ThemeContext } from '../..';
import { ADMIN_ROUTE, CART_ROUTE, SHOP_ROUTE } from '../../utils/constants';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './Header.scss';

export const Header = observer( () => {
    const { user } = useContext(ThemeContext);
  return (
    <header>
        <div className="headerLogo">
            <Link to={SHOP_ROUTE}><img className='logo' src="/images/header/logo.jpg" alt="Логотип"/></Link>
            <h1>BoPods</h1>
        </div>
        {user.isAuth ?( 
        <div className="navItems">
          <img className='navItem' src="/images/header/user.svg" alt="Профиль" />
          <img className='navItem' src="/images/header/exit.svg" alt="Выход" />
        </div>
        ):(
        <div className="navItems">
          <button className="auth" onClick={() => user.setIsAuth(true)}>Войти</button>
        </div>
        )}
    </header>
  )
});
