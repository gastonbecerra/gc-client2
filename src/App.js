import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import SheetIndex from './pages/Sheets';
import HomeIndex from './pages/Home';
import DataIndex from './pages/Data';

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
    </Routes>

    </Provider>
    </BrowserRouter>

    </>
  );
}

export default App;
