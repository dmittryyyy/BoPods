import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/constants';

export const DeviceItem = ({ device }) => {
    const navigate = useNavigate();
  return (
    <div className='productsItem' onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
        <div style={{width: 150, cursor: 'pointer'}}>
            <img width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} alt='Фото продукта'/>
            <div>
                <p>{device.name}</p>
                <p>{device.price + ' руб'}</p>
            </div>
        </div>
    </div>
  )
}
