import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app/App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';

import './index.scss';


export const ThemeContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContext.Provider 
    value={{
      user: new UserStore(),
      devices: new DeviceStore()
    }}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>
);
