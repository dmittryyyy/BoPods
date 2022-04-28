import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { DevicesList } from '../../components/devicesList/DevicesList';
import { BrandBar } from './BrandBar';
import { TypeBar } from './TypeBar';
import { ThemeContext } from '../..';
import { getBrands, getTypes, getDevices } from '../../services/deviceAPI';

import './Shop.scss';


export const Shop = observer ( () => {
  const { device } = useContext(ThemeContext);

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState(false);

  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  };

  const getAllProducts = () => {
    getDevices(null, null, 1, 8).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    })
    device.setSelectedType('');
    device.setSelectedBrand('');
    setAllProducts(true);
  }

  useEffect( () => {
    setIsLoading(true);
    getTypes().then(data => device.setTypes(data));
    getBrands().then(data => device.setBrands(data));
    getDevices(null, null, 1, 2).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    })
    setIsLoading(false);
  }, []);

  useEffect( () => {
    getDevices(device.selectedType.id, device.selectedBrand.id, device.page, 4).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    })
  }, [device.selectedType, device.selectedBrand, device.page, 4]);

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <div className="wrapperShop">
      <div className='sidebar container'>
        <TypeBar 
        getAllProducts={getAllProducts}
        allProducts={allProducts}
        />
      </div>
      <main>
        <div className='productMain container'>
         <div className="mainTop">
         <BrandBar />
          <div className="search">
            <img src="/images/search.svg" alt="Поиск" />
          {searchValue && <span className='clearInput' onClick={() => setSearchValue('')}>X</span>}
            <input type="text" 
            placeholder='Поиск...'
            value={searchValue}
            onChange={onChangeSearchValue}/>
          </div>
         </div>
          <DevicesList 
          searchValue={searchValue}
          isLoading={isLoading}
          />
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
