import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbars from './components/Navbars';
import Home from './components/Home';

import "bootstrap/dist/css/bootstrap.min.css";
import ChainDetail from './components/ChainDetail';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbars />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:chainName" element={<ChainDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;