import starIcon from '../../assets/star-icon.png';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import styles from './Search.module.css';
import signalIcon from '../../assets/signal-icon-dark.png';
import wifiIconDarker from '../../assets/wifi-icon-dark.png';
import batteryIcon from '../../assets/battery-icon-dark.png';
import cart from '../../assets/cart.png';
import search from '../../assets/search.png';

const Search: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');

    useEffect(() => {
        const productsRef = ref(db, 'products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productList = data ? Object.values(data) : [];
            setProducts(productList);

            // Sort products by number of reviews and set top products
            const sortedProducts = [...productList].sort((a, b) => b.reviews.length - a.reviews.length);
            setTopProducts(sortedProducts.slice(0, 3)); // Get top 3 products
        });
    }, []);

    const filteredProducts = searchTerm
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleSearch = () => {
        navigate('/search', { state: { searchTerm } });
    };

    const handleProductClick = (id: string) => {
        navigate(`/overview/${id}`);
    };

    return (
        <div>
            <header className={styles.header}>
                <div id={styles.time}>
                    9:41
                </div>
                <div id={styles.icons}>
                    <img src={signalIcon} alt="Signal" className={styles.headerIcon}/>
                    <img src={wifiIconDarker} alt="WiFi" className={`${styles.headerIcon} ${styles.wifiIconDarker}`}/>
                    <img src={batteryIcon} alt="Battery" className={styles.headerIcon}/>
                </div>
            </header>
            <div className={styles.secHeader}>
                <BackButton/>
                <p> Search</p>
                <img src={cart} alt="Cart" onClick={() => navigate('/cart')}/>
            </div>

            <div id={styles.inputContainer}>
                <img src={search} alt="Search" onClick={handleSearch} className={styles.inputIcon}/>
                <input className={styles.inputText}
                       type="text"
                       placeholder="Search by name"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={styles.searchResults}>
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id} onClick={() => handleProductClick(product.id)}>
                            <img src={product.img} alt={product.name} width="50" height="50"/>
                            <div className={styles.searchProducts}>
                                {product.name} - ${product.price}
                                <div className={styles.searchProductsReview}>
                                    <img src={starIcon} alt="Star" width="16" height="16"/>
                                    <div>{(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length).toFixed(1)}</div>
                                    <div>{product.reviews.length} reviews</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <section className={styles.rankingSection}>
                <h5>
                    Popular product
                </h5>
                <ul>
                    {topProducts.map((product) => (
                        <li key={product.id} onClick={() => handleProductClick(product.id)}>
                            <img src={product.img} alt={product.name} width="50" height="50"/>
                            <div className={styles.searchProducts}>
                                {product.name} - ${product.price}
                                <div className={styles.searchProductsReview}>
                                    <img src={starIcon} alt="Star" width="16" height="16"/>
                                    <div>{(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length).toFixed(1)}</div>
                                    <div>{product.reviews.length} reviews</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Search;