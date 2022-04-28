import { observer } from 'mobx-react-lite';
import { React, useContext } from 'react';

import { ThemeContext } from '../..';

export const TypeBar = observer ( ({ getAllProducts, allProducts }) => {

    const { device } = useContext(ThemeContext);

    const activeType = () => {
        
    }
    
  return (
    <>
        <ul className='sidebarItems'>
        <li 
        className='allProducts' 
        onClick={getAllProducts}>Показать все товары</li>
            {device.types.map(type => 
                <li
                className={`sidebarItem ${type.id === device.selectedType.id ? 'sidebarItemActive' : ''}`}
                key={type.id}
                onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </li>
            )}
        </ul>
    </>
  )
});

