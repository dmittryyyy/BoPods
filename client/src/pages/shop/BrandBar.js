import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ThemeContext } from '../..';

export const BrandBar = observer( () => {
    const { device } = useContext(ThemeContext);
  return (
    <div className='brands'>
        {device.brands.map(brand =>
            <div key={brand.id} 
            className={`brandsItem ${brand.id === device.selectedBrand.id ? 'brandsItemActive' : ''}`} 
            style={{cursor: "pointer"}}
            onClick={() => device.setSelectedBrand(brand)}
            >
                {brand.name}
            </div>
            )}
    </div>
  )
});
