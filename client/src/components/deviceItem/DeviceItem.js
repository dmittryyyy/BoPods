import { React, useContext, useState } from 'react';
import { DEVICE_ROUTE } from '../../utils/constants';
import { ThemeContext } from '../..';

import ContentLoader from 'react-content-loader';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export const DeviceItem = observer(({ device, isLoading, onAddToCart }) => {

  const { user } = useContext(ThemeContext);

  const [cartItems, setCartItems] = useState([]);

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
          <span className={user.isAdmin ? 'btnDelete' : 'btnDeleteHidden'} 
          title='Удалить товар'>x</span>
          <div className='deviceItemBottom'>
            <div className="deviceContent">
              <h3>{device.name}</h3>
              <p>{device.price + ' руб'}</p>
            </div>
            <button>+</button>
          </div>
        </div>
      )}
    </div>
  )
});
