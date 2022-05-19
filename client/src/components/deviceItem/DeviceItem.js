import { React, useContext } from 'react';

import { DEVICE_ROUTE } from '../../utils/constants';
import { ThemeContext } from '../..';
import { deleteDevice, addDeviceToCart, deleteDeviceFromCart } from '../../services/deviceAPI';

import ContentLoader from 'react-content-loader';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export const DeviceItem = observer(({ device, isLoading, getAllProducts }) => {

  const { user, cart } = useContext(ThemeContext);

  const deleteDeviceAdmin = () => {
    deleteDevice(device.id).then(() => getAllProducts());
  };

  const addDeviceInCart = (device) => {
    if (user.isAuth) {
      addDeviceToCart(device).then(() => cart.setCart(device));
    } else {
      cart.setCart(device);
      localStorage.setItem("cart", JSON.stringify(cart.cart));
    }
    cart.totalPrice += device.price;
  }

  // const isDeviceInCart = () => {
  //     const findDevice = cart.setCart.findIndex(item => Number(item.id) === Number(device.id));
  //     return findDevice < 0;
  // }

  const deleteDeviceInCart = (device) => {
    if(user.isAuth) {
      deleteDeviceFromCart(device.id).then(() => {
        cart.cart.filter(item => item.id !== device.id);
      })
    } else if(!user.isAuth) {
      cart.cart.filter(item => item.id !== device.id);
      localStorage.removeItem('cart', (cart.cart));
    }
  };

  const navigate = useNavigate();

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
          <span className={user.isAdmin ? 'btnDeleteAdmin' : 'btnDeleteUser'}
            onClick={user.isAdmin ? deleteDeviceAdmin : () => deleteDeviceInCart(device)}
            title='Удалить товар'>x</span>
          <div className='deviceItemBottom'>
            <div className="deviceContent">
              <h3>{device.name}</h3>
              <p>{device.price + ' руб'}</p>
            </div>
            <button onClick={() => addDeviceInCart(device)}>+</button>
            {/* {isDeviceInCart() ? (
              <button onClick={() => addDeviceInCart(device)}>+</button>
            
            ):(

              <button className='buttonActive'>✓</button>
            )}         */}
          </div>
        </div>
      )}
    </div>
  )
});
