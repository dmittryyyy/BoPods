import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { AppRouter } from '../appRouter/AppRouter';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../..';

import './App.scss';
import { check } from '../../services/userAPI';


export const App = observer( () => {
  const { user } = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    setIsLoading(true);
      check().then(data =>{
        if (data.role === 'ADMIN') {
          user.setIsAdmin(true);
          user.setIsAuth(true);
          user.setUser(data);
        } else {
          user.setIsAuth(true);
          user.setUser(data);
        }
      })
      setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className='gifLoading'><img src="/images/loading.gif" alt="Загрузка"/></div>
  }

  return (
    <BrowserRouter>
      <div className="App App-init">
        <Header/>
        <AppRouter />
        <Footer/>
      </div>
    </BrowserRouter>
  );
})

