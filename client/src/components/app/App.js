import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '../appRouter/AppRouter';

import './App.scss';

export function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

