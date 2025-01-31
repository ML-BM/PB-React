import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Search from './pages/Search.tsx'
import Explore from './pages/Explore.tsx'
import ProductOverview from './pages/ProductOverview.tsx'
import ProductSpecific from './pages/ProductSpecific.tsx'
import Cart from './pages/Cart.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/search" element={<Search />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/overview" element={<ProductOverview />} />
                <Route path="/specific" element={<ProductSpecific />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);