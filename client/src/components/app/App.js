import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '../appRouter/AppRouter';
import { Header } from '../header/Header';

import './App.scss';

export function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
