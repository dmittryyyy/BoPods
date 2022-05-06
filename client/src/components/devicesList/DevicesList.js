import { React, useContext } from 'react';
import { ThemeContext } from '../..';
import { DeviceItem } from '../deviceItem/DeviceItem';

import { observer } from 'mobx-react-lite';


export const DevicesList = observer(({ searchValue, isLoading, getAllProducts }) => {

  const { device } = useContext(ThemeContext);

  const renderProducts = () => {
    const filterDevices = device.devices.filter(device =>
      device.name.toLowerCase().includes(searchValue));

    return (isLoading ? [...Array(8)] : filterDevices).map((device, index) =>
      <DeviceItem
        isLoading={isLoading}
        key={index}
        device={device} 
        getAllProducts={getAllProducts}
        />
    )};

  return (
    <div className='products'>
      {renderProducts()}
    </div>
  )
});
