import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { DevicesList } from '../../components/devicesList/DevicesList';
import { BrandBar } from './BrandBar';
import { TypeBar } from './TypeBar';
import { ThemeContext } from '../..';
import { getBrands, getTypes, getDevices } from '../../services/deviceAPI';

import { Search } from './Search';
import { Pages } from './Pages';

import './Shop.scss';

export const Shop = observer(() => {
  const { device, cart, user } = useContext(ThemeContext);

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = () => {
    getDevices(null, null, device.page, 9).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
      device.setSelectedBrand('');
      device.setSelectedType('');
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (user.isAuth) {
      cart.getCartData(true);
    } else {
      cart.getCartData();
    }
    getTypes().then(data => device.setTypes(data));
    getBrands().then(data => device.setBrands(data));
    getDevices(null, null, 1, 9).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    })
    setIsLoading(false);
  }, [device]);

  useEffect(() => {
    getDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    })
  }, [device.selectedType, device.selectedBrand, device.page, device,]);

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
