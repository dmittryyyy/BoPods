import React from 'react';
import { DEVICE_ROUTE } from '../../utils/constants';

import { useNavigate } from 'react-router-dom';


export const DeviceItem = ({ device }) => {
    const navigate = useNavigate();
  return (
    <div className='productsItem'>
        <div style={{width: 150, cursor: 'pointer'}}>
            <img width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)} alt='Фото продукта'/>
            <div className='deviceItemBottom'>
                <div className="deviceContent">
                <h3>{device.name}</h3>
                <p>{device.price + ' руб'}</p>
                </div>
                <button>+</button>
            </div>
        </div>
    </div>
  )
}
