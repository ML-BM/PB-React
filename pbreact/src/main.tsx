import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx'
import Home from './Home.tsx'
import SignIn from 'SignIn.tsx'
import SignUp from 'SignUp.tsx'
import Search from 'Search.tsx'
import Explore from './Explore.tsx'
import ProductOverview from './ProductOverview.tsx'
import ProductSpecific from './ProductSpecific.tsx'
import Cart from './Cart.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Rota para a página de login */}
                <Route path="/" element={<App />} />
                {/* Rota para a página home */}
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);