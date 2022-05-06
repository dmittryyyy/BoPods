import { React, useContext, useState } from 'react';

import { СartInfo } from './CartInfo';
import { DeviceItem } from '../../components/deviceItem/DeviceItem';
import { ThemeContext } from '../..';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './Cart.scss';
import '../shop/Shop.scss';


export const Cart = observer(() => {

  const { cart } = useContext(ThemeContext);

  const [isSending, setIsSending] = useState(false);

  return (
    <div className="wrapperCart">
     
      <Link to='/'><img src="/images/arrowLeft.svg"
        alt="Кнопка назад"
        className='btnBack'
      /></Link>
       
      {cart.Cart.length > 0 ? (
        <div className="cartTop">
      <div className="totalPrice">{'Всего: ' + cart.Price + ' руб'}</div>
      <button onClick={() => cart.setDeleteAllDeviceFromCart()} className='clearCart'>Очистить корзину</button>
      </div>
      ):( ''
      )}
     
      <div className='cartBlock container'>
        {cart.Cart.length > 0 ?
          <>
            <div className='products'>
              {cart.Cart.map(device =>
                <DeviceItem key={device.id} 
                device={device} 
                
                />
              )}
            </div>
            <button>Оформить заказ</button>
          </>

          : <СartInfo
            title={isSending ? 'Заказ оформлен!' : 'Корзина пока пуста...'}
            img={isSending ? '/images/orderSuccess.png' : '/images/cartNull.jpg'}
            descr={isSending ?  'Скоро с вами свяжутся для уточнения деталей заказа.' : 'Добавьте что-нибудь в корзину.'}
          />
        }
      </div>
    </div>
  )
});

