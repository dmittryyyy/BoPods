import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app/App';
import { UserStore } from './store/UserStore';
import { DeviceStore } from './store/DeviceStore';
import { CartStore } from './store/CartStore';

import './index.scss';

export const ThemeContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContext.Provider 
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
      cart: new CartStore(),
    }}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>
);
