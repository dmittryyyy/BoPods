import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { DevicesList } from '../../components/devicesList/DevicesList';
import { BrandBar } from './BrandBar';
import { TypeBar } from './TypeBar';
import { ThemeContext } from '../..';
import { getBrands, getTypes, getDevices } from '../../services/deviceAPI';

import './Shop.scss';


export const Shop = observer ( () => {
  const { device } = useContext(ThemeContext);

  useEffect(() => {
    getTypes().then(data => device.setTypes(data));
    getBrands().then(data => device.setBrands(data));
    getDevices().then(data => device.setDevices(data.rows));
  }, []);

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
});
