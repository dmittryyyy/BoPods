import { React, useContext, useEffect } from 'react';

import { DEVICE_ROUTE } from '../../utils/constants';
import { ThemeContext } from '../..';
import { addDeviceToCart, deleteDevice, updateDevices } from '../../services/deviceAPI';

import ContentLoader from 'react-content-loader';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

export const DeviceItem = observer(({ deviceOneItem, isLoading, getAllProducts }) => {

  const { user, cart } = useContext(ThemeContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuth) {
      cart.getCartData(true);
    } else {
      cart.getCartData();
    }
  }, [user.isAuth, cart]);

  const isDeviceInCart = () => {
    return cart.cart.some((item) => Number(item.id) === Number(deviceOneItem.id));
  }

  const addDeviceInCart = action((deviceItem) => {
    const checkDeviceInBasket = cart._cart.findIndex(device => device.id === deviceItem.id);
    if (checkDeviceInBasket < 0) {
      cart._cart = [...cart._cart, { ...deviceItem }];
      cart._totalPrice += deviceItem.price;
      if (user.isAuth) {
        addDeviceToCart(deviceItem).then(() => cart.setCart(deviceItem));
      } else {
        cart.putProduct(deviceItem);
      }
    } else {
      cart.deleteDeviceInCart(deviceItem, user.isAuth ? true : false);
    }
    cart.calculatePriceAndCountsProductInCart();
  });

  const setCountDevice = action((deviceId, action) => {
    const itemId = cart._cart.findIndex(item => item.id === deviceId.id);
    const itemInState = cart._cart.find(device => device.id === deviceId.id);
    if (action === "+") {
      itemInState.count++;
    } else {
      itemInState.count--;
      if (itemInState.count < 1) {
        itemInState.count++;
      }
    }
    const newItem = {
      ...itemInState,
    }
    cart._cart = [...cart._cart.slice(0, itemId), newItem, ...cart._cart.slice(itemId + 1)]
    let totalPrice = 0;
    cart._cart.forEach((device) => totalPrice += Number(device.price * device.count));
    cart._totalPrice = totalPrice;
    if (user.isAuth) {
      updateDevices(deviceId.id, newItem)
    } else {
      localStorage.setItem('cart', JSON.stringify(cart._cart));
    }
    cart.calculatePriceAndCountsProductInCart();
  });

  const deleteDeviceAdmin = action(async () => {
    await deleteDevice(deviceOneItem.id).then(() => getAllProducts());
  });

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
          <img width={150} height={150} src={process.env.REACT_APP_API_URL + deviceOneItem.img} onClick={() => navigate(DEVICE_ROUTE + '/' + deviceOneItem.id)} alt='Фото продукта' />

          {user.isAdmin ? (
            <span className='btnDeleteAdmin'
              onClick={deleteDeviceAdmin}
              title='Удалить товар'>x</span>
          ) : (
            <span className='btnDeleteUser'
              onClick={user.isAuth ? () => cart.deleteDeviceInCart(deviceOneItem, true) : () => cart.deleteDeviceInCart(deviceOneItem)}
              title='Удалить товар'>x</span>
          )}

          <div className='deviceItemBottom'>
            <div className="deviceContent">
              <h3>{deviceOneItem.name}</h3>
              <p>{deviceOneItem.price + ' руб'}</p>
            </div>

            {!user.isAdmin ? <button className={isDeviceInCart() ? 'buttonActive' : ''}
              onClick={user.isAuth ? () => addDeviceInCart(deviceOneItem, true) : () => addDeviceInCart(deviceOneItem)}>{isDeviceInCart(deviceOneItem) ? '✓' : '+'}</button> : ''}

            <div className="countDevice">
              <img className='minusCount' onClick={() => setCountDevice(deviceOneItem, '-', true)} src="images/minus.svg" alt="plus" />
              <span>{Number(deviceOneItem.count)}</span>
              <img className='plusCount' onClick={() => setCountDevice(deviceOneItem, '+', true)} src="images/plus.svg" alt="plus" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
});
