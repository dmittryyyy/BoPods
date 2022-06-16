import { React, useContext } from 'react';
import { ThemeContext } from '../..';
import { DeviceItem } from '../deviceItem/DeviceItem';

import { observer } from 'mobx-react-lite';


export const DevicesList = observer(({ searchValue, isLoading, getAllProducts }) => {

  const { device, cart } = useContext(ThemeContext);

  const renderProducts = () => {
    const filterDevices = device.devices.filter(itemSearch =>
      itemSearch.name.toLowerCase().includes(searchValue));

    return (isLoading ? [...Array(8)] : filterDevices).map((itemSearch, index) =>
      <DeviceItem
        isLoading={isLoading}
        key={index}
        deviceOneItem={itemSearch} 
        getAllProducts={getAllProducts}
        />
    )};

  return (
    <div className='products'>
      
      {renderProducts()}
     
    </div>
  )
});
