import { React, useContext } from 'react';

import { DEVICE_ROUTE } from '../../utils/constants';
import { ThemeContext } from '../..';
import { addDeviceToCart, deleteDevice } from '../../services/deviceAPI';

import ContentLoader from 'react-content-loader';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export const DeviceItem = observer(({ device, isLoading }) => {

  const { user, cart } = useContext(ThemeContext);

  const isDeviceInCart = () => {
    const findDevice = cart.Cart.finIndex(item => Number(item.id) === Number(device.id));
    return findDevice < 0;
  }

  const addDeviceInCart = (device) => {
    if (user.isAuth) {
      addDeviceToCart(device).then(() => cart.setCart(device, true))
    } else {
      cart.setCart(device);
    }
  }

  const deleteDeviceCart = (device) => {
    cart.setDeleteItemCart(device).then(() => cart.setCart(true))
  }

  const deleteDeviceAdmin = () => {
    deleteDevice(device.id);
  }


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
          <img width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)} alt='Фото продукта'/>
          <span className={user.isAdmin ? 'btnDeleteAdmin' : 'btnDeleteUser'}
            onClick={user.isAdmin ? deleteDeviceAdmin : deleteDeviceCart}
            title='Удалить товар'>x</span>
          <div className='deviceItemBottom'>
            <div className="deviceContent">
              <h3>{device.name}</h3>
              <p>{device.price + ' руб'}</p>
            </div>
            {isDeviceInCart ? (
              <button onClick={() => addDeviceInCart(device)}>+</button>
            ) : (
              <button className='buttonActive'>✓</button>
            )
            }
          </div>
        </div>
      )}
    </div>
  )
});
