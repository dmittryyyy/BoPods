import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { DeviceItem } from '../../components/deviceItem/DeviceItem';
import { ThemeContext } from '../..';

import './Profile.scss';

export const Profile = () => {
    const [orderItems, setOrderItems] = useState([]);

    const { device } = useContext(ThemeContext);

  return (
    <div className="wrapperCart">
    <Link to='/'><img src="/images/arrowLeft.svg" 
    alt="Кнопка назад" 
    className='btnBack'
    /></Link>
    <div className='cartBlock container'>
        {orderItems.length > 0 ?
        <div className='products'>
        {device.devices.map(device =>
            <DeviceItem key={device.id} device={device}/>
            )}
    </div>
    
    : <div>
        <h3>Пока здесь нет заказов!</h3>
        <img className='orderNull' src="/images/cart.jpg" alt="Коризна" />
    </div>
      }
    </div>
  </div>
  )
}
