import React, { useState } from 'react';
import { Modals } from '../../components/modals/Modals';
import './AdminPanel.scss';

export const AdminPanel = () => {
  const [isProduct, setIsProduct] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isBrand, setIsBrand] = useState(false);

  const closeModal = () => {
    if (isProduct) {
      setIsProduct(false)
    } else if (isType) {
      setIsType(false)
    } else if (isBrand) {
      setIsBrand(false)
    }
  }

  return (
    <>
      <div className="adminContainer" style={{ height: window.innerHeight}}>
        <div className="AdminWrapper">
          <h2>Административная панель</h2>
          <div className="buttonControl">
            <button onClick={() => setIsProduct(true)}>Добавить товар</button>
            <button onClick={() => setIsType(true)}>Добавить тип товара</button>
            <button onClick={() => setIsBrand(true)}>Добавить новый брэнд</button>
          </div>
        </div>
        <Modals
          showProd={isProduct}
          showType={isType}
          showBrand={isBrand}
          closeModal={closeModal}
        />
      </div>
    </>
  )
}


