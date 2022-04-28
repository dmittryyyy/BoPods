import { React, useContext, useState } from 'react';
import { СartInfo } from './CartInfo';
import { DeviceItem } from '../../components/deviceItem/DeviceItem';
import { ThemeContext } from '../..';

import { Link } from 'react-router-dom';

import './Cart.scss';


export const Cart = ({ cartItems }) => {

  const { device } = useContext(ThemeContext);

  return (
    <div className="wrapperCart">
      <Link to='/'><img src="/images/arrowLeft.svg" 
      alt="Компьютер" 
      className='btnBack'
      /></Link>
      <div className='cartBlock container'>
          {cartItems.length > 0 ?
          <div className='products'>
          {device.devices.map(device =>
              <DeviceItem key={device.id} device={device}/>
              )}
      </div>
      
      : <СartInfo
            title={'Корзина пока пуста...'}
            img={'/images/cartNull.jpg'}
            descr={'Добавьте хотя-бы один товар!'}
      />
        }
      </div>
    </div>
  )
}

