import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbars from './components/Navbars';
import Home from './components/Home';

import "bootstrap/dist/css/bootstrap.min.css";
import ChainDetail from './components/ChainDetail';
import Footer from './components/Footer';
import Cardano from './components/Cardano';

const App = () => {
  return (
    <>
      <Navbars />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chain/cardano" element={<Cardano />} />
        <Route path="/:chainName" element={<ChainDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;