import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import SheetIndex from './pages/Sheets/Sheets';
import HomeIndex from './pages/Home/Home';
import DataIndex from './pages/Data/Data';
import DataModal from './pages/Data/DataModal';

function App() {

  return (

    <>
    
    <BrowserRouter>
    <Provider store={store}>

    <div>
      <h1><Link to={'/'}>getContext()</Link></h1>
    </div>

    <Routes>
      <Route exact path="/" element={<HomeIndex />}/>
      <Route exact path="/sheets" element={<SheetIndex />}/>
      <Route exact path="/data" element={<DataIndex />}/>
      <Route exact path="/data/:type/:id" element={<DataModal />}/>
    </Routes>

    </Provider>
    </BrowserRouter>

    </>
  );
}

export default App;
