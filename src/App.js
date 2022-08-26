import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MarketPlace from './pages/MarketPlace';
import MintNft from './pages/MintNft';
import MyNfts from './pages/MyNfts';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<MarketPlace />} />
          <Route path='mint-nft' element={<MintNft />} />
          <Route path='my-nfts' element={<MyNfts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
