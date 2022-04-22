import React from 'react';
import { DevicesList } from '../../components/devicesList/DevicesList';
import { BrandBar } from './BrandBar';
import { TypeBar } from './TypeBar';
import './Shop.scss';

export const Shop = () => {
  return (
    <div className="wrapperShop">
      <div className='sidebar container'>
        <TypeBar />
      </div>
      <main>
        <div className='productMain container'>
          <BrandBar />
          <DevicesList />
        </div>
      </main>
    </div>
  )
}
