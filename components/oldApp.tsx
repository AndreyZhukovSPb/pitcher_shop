/* 
import React from 'react';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
// import './components/header/Header.css'
import Header from './components/Header/Header';
import {CarouselBox} from './components/Carousel/Carousel';
import Stores from './components/Stores/Stores';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from './components/Footer/Footer';
import Coffeeshop from './components/Coffeeshop/Coffeeshop';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import SectionLine from './components/SectionLine/SectionLine';
import Contacts from './components/Contacts/Contacts';
import Main from './components/Main/Main';
// import { Switch } from 'react-router-dom';

function App() {
  const [isStore, setIsStore] = useState(false);
  
  return (
    <div className={`page ${isStore ? "page_type_white" : ""}`}>
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header headerType="main_header header__type_main" isMain={true} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/contacts"
            element={
              <>
                <Header headerType="" isContacts={true}/>
                <SectionLine isMain={false} />
                <Contacts />
              </>
            }
          />
          <Route
            path="/park"
            element={
              <>
                <Header headerType="main_header" isPark={true} />
                <SectionLine isMain={false} />
                <Coffeeshop isMayak={false} isPark={true}/>
              </>
            }
          />
          <Route
            path="/mayak"
            element={
              <>
                <Header headerType="main_header" isMayak={true} />
                <SectionLine isMain={false} />
                <Coffeeshop isMayak={true} isPark={false}/>
              </>
            }
          />
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;

*/
