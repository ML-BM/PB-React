import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Search from './pages/search/Search'
import Explore from './pages/explore/Explore'
import ProductOverview from './pages/product/ProductOverview'
import ProductSpecific from './pages/product/ProductSpecific'
import Cart from './pages/cart/Cart'


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