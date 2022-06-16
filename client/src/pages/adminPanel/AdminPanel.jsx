import { React, useState } from 'react';
import { Modals } from '../../components/modals/Modals';

import { Link } from 'react-router-dom';

import './AdminPanel.scss';

export const AdminPanel = () => {
  const [isProduct, setIsProduct] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isBrand, setIsBrand] = useState(false);
  const [isDeleteTypeBrand, setIsDeleteTypeBrand] = useState(false);

  const closeModal = () => {
    if (isProduct) {
      setIsProduct(false);
    } else if (isType) {
      setIsType(false);
    } else if (isBrand) {
      setIsBrand(false);
    } else if (isDeleteTypeBrand) {
      setIsDeleteTypeBrand(false);
    }
  }

  return (
    <>
      <div className="adminContainer">
      <Link to='/'><img src="/images/arrowLeft.svg" alt="Кнопка назад" /></Link>
      <Modals
          showProd={isProduct}
          showType={isType}
          showBrand={isBrand}
          showDeleteTypeBrand={isDeleteTypeBrand}
          closeModal={closeModal}
        />
        <div className="AdminWrapper">
        <div className="statisticBlock">
            <ul>
              <li className='pos'>Количество посищений за месяц: {15}</li>
              <li className='time'>Сделано заказов на {15} р</li>
              <li className='orders'>Общее количество заказов: {15}</li>
            </ul>
          </div>
          <img src="/images/adminPanel.png" alt="Компьютер" />
          <div className="buttonBlock">
            <button className='prodBtn' onClick={() => setIsProduct(true)}>Добавить новый товар</button>
            <button className='typeBtn' onClick={() => setIsType(true)}>Добавить тип товара</button>
            <button className='brandBtn' onClick={() => setIsBrand(true)}>Добавить новый брэнд</button>
          </div>
          <button className='deleteTypeBrand' onClick={() => setIsDeleteTypeBrand(true)}>Удалить тип или брэнд</button>
        </div>
      </div>
    </>
  )
}


