import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/constants';

export const DeviceItem = ({ device }) => {
    const navigate = useNavigate();
  return (
    <div md={3} className='productsItem' onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
        <div style={{width: 150, cursor: 'pointer'}} border={'light'} className='mt-2'>
            <img width={150} height={150} src={device.img} alt='Фото продукта'/>
            <div>
                <p className='text-align-center'>{device.name}</p>
            </div>
        </div>
    </div>
  )
}
