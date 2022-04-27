import { React, useEffect, useState } from 'react';
import { getDevice } from '../../services/deviceAPI';

import { useParams, Link } from 'react-router-dom';

import './Device.scss';

export const Device = () => {

  const [isDevice, setIsDevice] = useState({info: []});

  const {id} = useParams();

  useEffect( () => {
    getDevice(id).then(data => setIsDevice(data))
  }, [])

  return (
    <div className='deviceContainer'>
      <Link to='/'><img src="/images/arrowLeft.svg" alt="Компьютер" /></Link>
      <div className="deviceWrapper">
        <div className="leftBlock">
        <h2>{isDevice.name}</h2>
          <img src={process.env.REACT_APP_API_URL + isDevice.img} alt="Фото товара" width={300} height={300} />
          <p>{isDevice.price + ' руб.'}</p>
          <button>Добавить в корзину</button>
        </div>

        <div className="rightBlock">
        <div className="featureItems">
          <h3>Характеристики</h3>
          {isDevice.info.map((info) =>
            <div className='feutersItem'
            key={info.id}>
              {info.title} : {info.description}
            </div>
            )}
            </div>
          <div className="description">
          <h3>Описание</h3>
          <p>
            {'Здесь будет описание'}
          </p>
          </div>
        </div>
      </div>
    </div>
  )
}
