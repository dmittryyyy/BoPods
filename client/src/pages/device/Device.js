import React from 'react';
import './Device.scss';

export const Device = () => {
  const device = { id: 1, name: 'Apple Watch 7', price: '5000', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCE4pgmmjxgEJLk7mnz1IuJ0n403lhR7c8sw&usqp=CAU' };
  const description = [
    {id: 1, title: 'Экран', description: '24см'},
    {id: 2, title: 'Аккумулятор', description: '1200'},
    {id: 3, title: 'Экран', description: '24см'},
    {id: 4, title: 'Экран', description: '24см'},
    {id: 5, title: 'Экран', description: '24см'},
  ]

  return (
    <div className='deviceContainer' style={{ height: window.innerHeight - 54 }}>
      <div className="deviceWrapper">
        <div className="imagesProduct">
          <img src={device.img} alt="Фото товара" width={300} height={300} />
        </div>
        <div className="featureItems">
          <h3>{device.name}</h3>
          <h3>Характеристики</h3>
          {description.map(descr =>
            <div className='feutersItem'
            key={descr.id}>
              {descr.title} : {descr.description}
            </div>
            )}
        </div>
        <div className="addCartBlock">
          <p>{device.price + ' руб.'}</p>
          <button>Добавить в корзину</button>
        </div>
      </div>
    </div>
  )
}
