import React, { useEffect, useState } from 'react';
import { getDevice } from '../../services/deviceAPI';

import { useParams } from 'react-router-dom';

import './Device.scss';

export const Device = () => {
  const [isDevice, setIsDevice] = useState({info: []});
  const {id} = useParams();

  useEffect( () => {
    getDevice(id).then(data => setIsDevice(data))
  }, [])

  return (
    <div className='deviceContainer' style={{ height: window.innerHeight - 54 }}>
      <div className="deviceWrapper">
        <div className="imagesProduct">
          <img src={process.env.REACT_APP_API_URL + isDevice.img} alt="Фото товара" width={300} height={300} />
        </div>
        <div className="featureItems">
          <h3>{isDevice.name}</h3>
          <h3>Характеристики</h3>
          {isDevice.info.map((info) =>
            <div className='feutersItem'
            key={info.id}>
              {info.title} : {info.description}
            </div>
            )}
        </div>
        <div className="addCartBlock">
          <p>{isDevice.price + ' руб.'}</p>
          <button>Добавить в корзину</button>
        </div>
      </div>
    </div>
  )
}
