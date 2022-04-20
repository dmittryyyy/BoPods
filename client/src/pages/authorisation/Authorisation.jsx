import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants'

import './Authorisation.scss';

export const Authorisation = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <div className='Auth'>
      <div className="wrapperForm">
      <form action="">
        <h1 className='titleForm'>{isLogin ? "Авторизация" : "Регистрация"}</h1>
        <div className="formControl">
          <input type="text" placeholder='Введите E-mail'/>
          <input type="text" placeholder='Введите пароль'/>
        </div>
          {isLogin ? 
          <div className="formBtn">
          <button>Войти</button>
          <div className="btnReg">
            <p>Нет аккаунта?</p>
            <Link to={REGISTRATION_ROUTE} className='reg'>Зарегистрируйся!</Link>
          </div>
          </div>
          :
          <div className="formBtn">
          <button>Регистрация</button>
        <div className="btnReg">
          <p>Есть аккаунт?</p>
          <Link to={LOGIN_ROUTE} className='reg'>Войдите!</Link>
        </div>
        </div>
        }
        </form>
      </div>
    </div>
  )
}
