import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import SheetIndex from './pages/Sheets/Sheets';
import HomeIndex from './pages/Home/Home';
import DataIndex from './pages/Data/Data';
import DataModal from './pages/Data/DataModal';
import Signin from './pages/Login/Signin';
import Footer from './layout/Footer';
import Header from './layout/Header';
function App() {

  return (

    <>
    
    <BrowserRouter>
    <Provider store={store}>
    <Header/>
    <Routes>
      <Route exact path="/" element={<HomeIndex />}/>
      <Route exact path="/sheets" element={<SheetIndex />}/>
      <Route exact path="/data" element={<DataIndex />}/>
      <Route exact path="/data/:type/:id" element={<DataModal />}/>
      <Route exact path="/signin" element={<Signin />}/>
    </Routes>

    <Footer/>

    </Provider>
    </BrowserRouter>

    </>
  );
}

export default App;
