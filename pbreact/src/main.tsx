import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx'
import Home from './Home.tsx'
import SignIn from './SignIn.tsx'
import SignUp from './SignUp.tsx'
import Search from './Search.tsx'
import Explore from './Explore.tsx'
import ProductOverview from './ProductOverview.tsx'
import ProductSpecific from './ProductSpecific.tsx'
import Cart from './Cart.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/sigin" element={<SignIn />} />
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