import { React, useContext } from 'react';

import { DEVICE_ROUTE } from '../../utils/constants';
import { ThemeContext } from '../..';
import { addDeviceToCart, deleteDevice } from '../../services/deviceAPI';

import ContentLoader from 'react-content-loader';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const DeviceItem = observer(({ deviceOneItem, isLoading, getAllProducts }) => {

  const { user, cart } = useContext(ThemeContext);

  const navigate = useNavigate();

  const isDeviceInCart = () => {
    return cart.cart.some((item) => Number(item.id) === Number(deviceOneItem.id));
  }

  const addDeviceInCart = (deviceItem) => {
    if (user.isAuth) {
      const checkDeviceInCart = cart._cart.findIndex(device => device.id === deviceItem.id);
      if (checkDeviceInCart < 0) {
        addDeviceToCart(deviceItem).then(() => cart.setCart(deviceItem));
        cart._cart = [...cart.cart, { ...deviceItem }];
        cart._totalPrice += deviceItem.price;
        localStorage.setItem('totalPrice', cart._totalPrice);
      }
    } else {
      cart.putProduct(deviceItem);
      localStorage.setItem('totalPrice', cart._totalPrice);
    }
  }

  const setCountDevice = (deviceItem, action) =>{
    const itemId = cart._cart.findIndex(item => item.id === deviceItem.id);
    const itemInState = cart._cart.find(device => device.id === deviceItem.id);
    if (action === "+") {
      const newItem = {
        ...itemInState,
        count: itemInState.count++
      }

      cart._cart = [...cart._cart.slice(0, itemId), newItem, ...cart._cart.slice(itemId + 1)]
      let totalPrice = Number(cart._totalPrice);
      cart._cart.forEach(device => totalPrice += Number(device.price * device.count));
      cart._totalPrice = totalPrice;

    } else {
      const newItem = {
        ...itemInState,
        count: itemInState.count === 1 ? 1 : itemInState.count--
      }

      cart._cart = [...cart._cart.slice(0, itemId), newItem, ...cart._cart.slice(itemId + 1)]
      let totalPrice = Number(cart._totalPrice);
      cart._cart.forEach(device => totalPrice -= Number(device.price * device.count));
      cart._totalPrice = totalPrice;
    }
    // localStorage.setItem('totalPrice', this._totalPrice);

    if (!user.isAuth) {
      localStorage.setItem("cart", JSON.stringify(cart._cart));
    }
  }

  const deleteDeviceAdmin = async () => {
    await deleteDevice(deviceOneItem.id).then(() => getAllProducts());
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

            <button className={isDeviceInCart() ? 'buttonActive' : ''}
              onClick={user.isAuth ? () => addDeviceInCart(deviceOneItem, true) : () => addDeviceInCart(deviceOneItem)}>{isDeviceInCart(deviceOneItem) ? '✓' : '+'}</button>

            <div className="countDevice">
              <img className='plusCount' onClick={() => setCountDevice(deviceOneItem, '-', true)} src="/images/plus.svg" alt="plus" />
              <input type="number" value={deviceOneItem.count} onChange={(e) => setCountDevice(Number(e.target.value))}></input>
              <img className='plusCount' onClick={() => setCountDevice(deviceOneItem, '+', true)} src="/images/plus.svg" alt="plus" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
});
