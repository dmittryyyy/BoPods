import { React, useContext, useEffect, useState } from 'react';

import { СartInfo } from './CartInfo';
import { DeviceItem } from '../../components/deviceItem/DeviceItem';
import { ThemeContext } from '../..';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './Cart.scss';
import '../shop/Shop.scss';

export const Cart = observer(() => {

  const { cart, user } = useContext(ThemeContext);

  const [isSending, setIsSending] = useState();

  useEffect(() => {
    if (user.isAuth) {
      cart.getCartData(true);
    } else {
      cart.getCartData();
    }
  }, [user.isAuth, cart]);

  const deleteAllDeviceFromCart = async () => {
    if (user.isAuth) {
      cart.cart.map(async (item) => {
        cart.deleteDeviceInCart(item, true);
      });
    } else {
      localStorage.clear();
    }
    cart.setCart([]);
    cart.calculatePriceAndCountsProductInCart();
  };

  return (
    <div className="wrapperCart">

      <Link to='/'><img src="/images/arrowLeft.svg"
        alt="Кнопка назад"
        className='btnBack'
      /></Link>

      {cart._cart.length > 0 ? (
        <>
          <div className="cartTop">
            <div className="totalPrice">Всего: {cart.totalPrice} руб</div>
            <button onClick={() => deleteAllDeviceFromCart()} className='clearCart'>Очистить корзину</button>
          </div>

          <div className='cartBlock container'>

            <div className='products'>
              {cart.cart.map(device =>
                <DeviceItem
                  key={device.id}
                  deviceOneItem={device}
                />
              )}
            </div>
            <button onClick={() => setIsSending(true)}>Оформить заказ</button>
          </div>
        </>

      ) : (

        <div className='cartBlock container'>
          <СartInfo
            title={isSending ? 'Заказ оформлен!' : 'Корзина пока пуста...'}
            img={isSending ? 'images/orderSuccess.png' : 'images/cartNull.jpg'}
            descr={isSending ? 'Скоро с вами свяжутся для уточнения деталей заказа.' : 'Добавьте что-нибудь в корзину.'} />
        </div>)}

    </div>
  )
});

