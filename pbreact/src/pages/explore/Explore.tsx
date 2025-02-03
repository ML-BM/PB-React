import * as React from 'react';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const Explore: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [category, setCategory] = useState(location.state?.category || '');
    const [sortBy, setSortBy] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [tempCategory, setTempCategory] = useState(category);
    const [tempSortBy, setTempSortBy] = useState(sortBy);

    useEffect(() => {
        const productsRef = ref(db, 'products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productList = data ? Object.values(data) : [];
            setProducts(productList);
        });
    }, []);

    const filteredProducts = products
        .filter((product) => !category || product.category === category)
        .sort((a, b) => {
            switch (sortBy) {
                case 'Popularity':
                    return b.popularity - a.popularity;
                case 'Newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'Oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'High Price':
                    return b.price - a.price;
                case 'Low Price':
                    return a.price - b.price;
                default:
                    return 0;
            }
        });

    const handleProductClick = (id: string) => {
        navigate(`/overview/${id}`);
    };

    const handleApplyFilters = () => {
        setCategory(tempCategory);
        setSortBy(tempSortBy);
        setShowPopup(false);
    };

    return (
        <div>
            <BackButton />
            <h1>Explore Products</h1>
            <button onClick={() => setShowPopup(true)}>Filter</button>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Filter Options</h2>
                        <select onChange={(e) => setTempCategory(e.target.value)} value={tempCategory}>
                            <option value="">All Categories</option>
                            <option value="headsets">Headsets</option>
                            <option value="headphones">Headphones</option>
                        </select>
                        <select onChange={(e) => setTempSortBy(e.target.value)} value={tempSortBy}>
                            <option value="">Sort by</option>
                            <option value="Popularity">Popularity</option>
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="High Price">High Price</option>
                            <option value="Low Price">Low Price</option>
                        </select>
                        <button onClick={handleApplyFilters}>Apply filters</button>
                    </div>
                </div>
            )}
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id} onClick={() => handleProductClick(product.id)}>
                        <img src={product.img} alt={product.name} width="50" height="50" />
                        {product.name} - ${product.price} - Rating: {(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length).toFixed(1)}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/cart')}>Cart</button>
        </div>
    );
};

export default Explore;