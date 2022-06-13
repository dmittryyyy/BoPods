import { React, useContext, useEffect, useState } from 'react';

import { DEVICE_ROUTE } from '../../utils/constants';
import { ThemeContext } from '../..';
import { addDeviceToCart, deleteDevice, getDevicesFromCart } from '../../services/deviceAPI';

import ContentLoader from 'react-content-loader';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const DeviceItem = observer(({ device, isLoading, getAllProducts }) => {

  const { user, cart } = useContext(ThemeContext);

  const navigate = useNavigate();

  let deviceCount = 1;

  useEffect(() => {
    if (user.isAuth) {
      getDevicesFromCart().then(cartData => cart.setCart(cartData));
    } else {
      cart.setCart(cart.getProduct());
      cart.setTotalPrice(Number(localStorage.getItem('totalPrice')));
    }
  }, []);

  const isDeviceInCart = () => {
    if (cart.cart !== []) {
      return cart.cart.some((item) => Number(item.id) === Number(device.id));
    } else {
      return []
    }
  }

  const addDeviceInCart = (deviceItem) => {
    if (user.isAuth) {
      addDeviceToCart(deviceItem).then(() => cart.setCart(deviceItem));
    } else {
      cart.putProduct(deviceItem);
      localStorage.setItem('totalPrice', cart.totalPrice);
    }
  }

  const plusCountDevice = () => {
    deviceCount++;
  }

  const deleteDeviceAdmin = async () => {
    await deleteDevice(device.id).then(() => getAllProducts());
  };

  return (
    <div className='device'>
      {isLoading ? (
        <ContentLoader
          className='contentLoader'
          speed={2}
          width={150}
          height={150}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">

          <rect x="34" y="20" rx="5" ry="5" width="200" height="170" />
          <rect x="29" y="200" rx="5" ry="5" width="180" height="50" />
        </ContentLoader>
      ) : (
        <div>
          <img width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)} alt='Фото продукта' />

          {user.isAdmin ? (
            <span className='btnDeleteAdmin'
              onClick={deleteDeviceAdmin}
              title='Удалить товар'>x</span>
          ) : (
            <span className='btnDeleteUser'
              onClick={user.isAuth ? () => cart.deleteDeviceInCart(device, true) : () => cart.deleteDeviceInCart(device)}
              title='Удалить товар'>x</span>
          )}

          <div className='deviceItemBottom'>
            <div className="deviceContent">
              <h3>{device.name}</h3>
              <p>{device.price + ' руб'}</p>
            </div>

            <button className={isDeviceInCart() ? 'buttonActive' : ''}
              onClick={user.isAuth ? () => addDeviceInCart(device, true) : () => addDeviceInCart(device)}>{isDeviceInCart(device) ? '✓' : '+'}</button>

            <div className="countDevice">
              <input type="number" defaultValue={deviceCount}></input>
              <img className='plusCount' onClick={() => plusCountDevice()} src="/images/plus.svg" alt="plus" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
});
