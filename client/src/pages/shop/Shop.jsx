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

  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  };

  useEffect( () => {
    getTypes().then(data => device.setTypes(data));
    getBrands().then(data => device.setBrands(data));
    getDevices(null, null, 1, 2).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, []);

  useEffect( () => {
    getDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.selectedType, device.selectedBrand, device.page, 2]);

  return (
    <div className="wrapperShop">
      <div className='sidebar container'>
        <TypeBar />
      </div>
      <main>
        <div className='productMain container'>
          <BrandBar />
          <DevicesList />
          <div className="pagination">
          {pages.map(page => 
            <div
            key={page}
            onClick={() => device.setPage(page)} 
            className={`pageItem ${device.page === page ? 'pageItemActive' : ''}`}>
              {page}
              </div>
            )}
        </div>
        </div>
      </main>
    </div>
  )
});
