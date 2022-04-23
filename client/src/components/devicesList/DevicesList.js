import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeContext } from '../..';
import { DeviceItem } from '../deviceItem/DeviceItem';

export const DevicesList = observer( () => {

    const { device } = useContext(ThemeContext);
    
  return (
    <div className='products'>
        {device.devices.map(device =>
            <DeviceItem key={device.id} device={device}/>
            )}
    </div>
  )
});
