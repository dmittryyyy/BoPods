import React, { useState } from 'react';
import { Modals } from '../../components/modals/Modals';
import './AdminPanel.scss';

export const AdminPanel = () => {
  const [isType, setIsType] = useState(false);
  const [isBrand, setIsBrand] = useState(false);
  const [isProduct, setIsProduct] = useState(false);

  return (
    <>
    <div className="adminContainer" style={{ height: window.innerHeight - 54 }}>
      <div className="AdminWrapper">
        <h2>Административная панель</h2>
        <div className="buttonControl">
          <button onClick={() => setIsType(true)}>Добавить товар</button>
          <button onClick={() => setIsProduct(true)}>Добавить тип товара</button>
          <button onClick={() => setIsBrand(true)}>Добавить новый брэнд</button>
        </div>
      </div>
      <Modals
      
      />
    </div>
    </>
  )
}


