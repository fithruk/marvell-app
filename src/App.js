
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {MainPage, ComicsPage} from "./components/pages"

import AppHeader from './components/appHeader/appHeader';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

import vision from "./components/images/vision.png"

import AppComicsApart from './components/appComicsApart/AppComicsApart';
import AppCharApart from './components/appCharApart/AppCharApart';
const App = () => {

  return (
    <Router>
      <div className="App">
        <header>
          <ErrorBoundary>
            <AppHeader />
          </ErrorBoundary>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/AppCharApart/:charName" element={<AppCharApart />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path='/comics/:comicsId' element={<AppComicsApart />} />
          </Routes>
        </main>
        <img className='vision' src={vision} alt="vision" />
      </div>
    </Router>
  );
}

export default App;
