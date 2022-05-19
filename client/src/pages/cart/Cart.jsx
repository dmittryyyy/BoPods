import { React, useContext, useEffect, useState } from 'react';

import { СartInfo } from './CartInfo';
import { DeviceItem } from '../../components/deviceItem/DeviceItem';
import { ThemeContext } from '../..';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { getDevicesFromCart } from '../../services/deviceAPI';

import './Cart.scss';
import '../shop/Shop.scss';
import { set } from 'mobx';


export const Cart = observer(() => {

  const { cart, user } = useContext(ThemeContext);

  const [isSending, setIsSending] = useState();
  const [a, setA] = useState([]);

  useEffect(() => {
    if (user.isAuth) {
      getDevicesFromCart().then(devices => cart.setCart(devices));
    } else {
      
    }
  }, []);


  const deleteAllItemsCart = () => {
    cart.cart = [];
    cart.totalPrice = 0;
  }

  return (
    <div className="wrapperCart">
     
      <Link to='/'><img src="/images/arrowLeft.svg"
        alt="Кнопка назад"
        className='btnBack'
      /></Link>
       
      {cart.cart.length > 0 ? (
        <div className="cartTop">
      <div className="totalPrice">{'Всего: ' + cart.price + ' руб.'}</div>
      <button onClick={user.isAuth ? '' : () => deleteAllItemsCart} className='clearCart'>Очистить корзину</button>
      </div>
      ):( ''
      )}
     
      <div className='cartBlock container'>
        {cart.cart.length > 0 ?
          <>
            <div className='products'>
              {cart.cart.map(device =>
                <DeviceItem 
                key={device.id} 
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

