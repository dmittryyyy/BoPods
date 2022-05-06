import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { DevicesList } from '../../components/devicesList/DevicesList';
import { BrandBar } from './BrandBar';
import { TypeBar } from './TypeBar';
import { ThemeContext } from '../..';
import { getBrands, getTypes, getDevices } from '../../services/deviceAPI';

import './Shop.scss';
import { Search } from './Search';
import { Pages } from './Pages';


export const Shop = observer(() => {
  const { device } = useContext(ThemeContext);

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState(false);


  const getAllProducts = () => {
    getDevices(null, null, 1, 1).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    })
    device.setSelectedType('');
    device.setSelectedBrand('');
    setAllProducts(true);
  }

  useEffect(() => {
    setIsLoading(true);
    getTypes().then(data => device.setTypes(data));
    getBrands().then(data => device.setBrands(data));
    getDevices(null, null, 1, 1).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    })
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    })
  }, [device.selectedType, device.selectedBrand, device.page, 8]);


  return (
    <div className="wrapperShop">
      <div className='sidebar container'>

        <TypeBar
          getAllProducts={getAllProducts}
        />

      </div>

      <main>
        <div className='productMain container'>

          <div className="mainTop">
            <BrandBar />
            <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>

          <DevicesList
            searchValue={searchValue}
            isLoading={isLoading}
            getAllProducts={getAllProducts}
          />
          <Pages />

        </div>
      </main>
    </div>
  )
});
