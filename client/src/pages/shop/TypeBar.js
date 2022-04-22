import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../..';

export const TypeBar = observer ( () => {
    const { device } = useContext(ThemeContext);
  return (
    <div>
        <ul className='sidebarItems'>
            {device.types.map(type => 
                <li
                className={type.id === device.selectedType.id ? 'sidebarItemActive' : 'sidebarItem'}
                key={type.id}
                onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </li>
            )}
        </ul>
    </div>
  )
});

