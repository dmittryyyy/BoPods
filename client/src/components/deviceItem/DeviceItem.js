import { React, useContext, useEffect } from 'react';

import { DEVICE_ROUTE } from '../../utils/constants';
import { ThemeContext } from '../..';
import { addDeviceToCart, deleteDevice, updateDevice } from '../../services/deviceAPI';

import ContentLoader from 'react-content-loader';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

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

  const addDeviceInCart = (deviceItem) => {
    if (user.isAuth) {
      const checkDeviceInBasket = cart._cart.findIndex(device => device.id === deviceItem.id);
      if (checkDeviceInBasket < 0) {
        cart._cart = [...cart._cart, { ...deviceItem }];
        cart._totalPrice += deviceItem.price;
        localStorage.setItem('totalPrice', cart._totalPrice);
        addDeviceToCart(deviceItem).then(() => cart.setCart(deviceItem));
      }
    } else {
      cart.putProduct(deviceItem);
      localStorage.setItem('totalPrice', cart._totalPrice);
    }
  }

  const setCountDevice = (deviceId, action) => {
    const itemInd = cart._cart.findIndex(item => item.id === deviceId.id);
    const itemInState = cart._cart.find(device => device.id === deviceId.id);
    if (action === "+") {
      itemInState.count++;
        const newItem = {
            ...itemInState,
        }
        cart._cart = [...cart._cart.slice(0, itemInd), newItem, ...cart._cart.slice(itemInd + 1)]
        localStorage.setItem('count', itemInState.count);
        updateDevice(newItem);
    } else {
      itemInState.count--;
        const newItem = {
            ...itemInState,
        }
        cart._cart = [...cart._cart.slice(0, itemInd), newItem, ...cart._cart.slice(itemInd + 1)]
        localStorage.setItem('count', itemInState.count);
    }

    if(!user.isAuth) {
        localStorage.setItem("basket", JSON.stringify(cart._cart));
    }

    let totalPrice = 0;
    cart._cart.forEach(device => totalPrice += Number(device.price * device.count));
    cart._totalPrice = totalPrice;
    localStorage.setItem('totalPrice', cart._totalPrice);
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

            {!user.isAdmin ? <button className={isDeviceInCart() ? 'buttonActive' : ''}
              onClick={user.isAuth ? () => addDeviceInCart(deviceOneItem, true) : () => addDeviceInCart(deviceOneItem)}>{isDeviceInCart(deviceOneItem) ? '✓' : '+'}</button> : ''}

            <div className="countDevice">
              <img className='minusCount' onClick={() => setCountDevice(deviceOneItem, '-', true)} src="/images/minus.svg" alt="plus" />
              <span>{Number(deviceOneItem.count)}</span>
              <img className='plusCount' onClick={() => setCountDevice(deviceOneItem, '+', true)} src="/images/plus.svg" alt="plus" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
});
