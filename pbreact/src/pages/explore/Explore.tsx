import * as React from 'react';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import styles from './Explore.module.css';
import signalIcon from '../../assets/signal-icon-dark.png';
import wifiIconDarker from '../../assets/wifi-icon-dark.png';
import batteryIcon from '../../assets/battery-icon-dark.png';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';
import menu from '../../assets/menu-variant.png';
import search from '../../assets/search.png';
import cart from '../../assets/cart.png';
import filter from '../../assets/sliders.png';
import starIcon from '../../assets/star-icon.png';

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
        <section>
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
                <img src={cart} alt="Cart" onClick={() => navigate('/cart')}/>
            </div>
            <div>
                <h2>All Products</h2>
                <button className={styles.btnMainfilter} onClick={() => setShowPopup(true)}>
                    <div><img src={filter} alt="Filter" className={styles.headerIcon}/>
                    </div>
                    <div>Filter</div>
                </button>
                {showPopup && (
                    <div className={styles.popup}>
                        <div className={styles.popupContent}>
                            <div className={styles.popupHeader}>
                                <h2>Filter</h2>
                                <button className={styles.closeButton} onClick={() => setShowPopup(false)}>x</button>
                            </div>
                            <div className={styles.span}></div>
                            <p>Category</p>
                            <div className={styles.filterButtons}>
                                <button onClick={() => setTempCategory('headsets')}
                                        className={tempCategory === 'headsets' ? styles.activeButton : ''}>Headsets
                                </button>
                                <button onClick={() => setTempCategory('headphones')}
                                        className={tempCategory === 'headphones' ? styles.activeButton : ''}>Headphones
                                </button>
                            </div>
                            <p>Sort by</p>
                            <div className={styles.filterButtons}>
                                <button onClick={() => setTempSortBy('Popularity')}
                                        className={tempSortBy === 'Popularity' ? styles.activeButton : ''}>Popularity
                                </button>
                                <button onClick={() => setTempSortBy('Newest')}
                                        className={tempSortBy === 'Newest' ? styles.activeButton : ''}>Newest
                                </button>
                                <button onClick={() => setTempSortBy('Oldest')}
                                        className={tempSortBy === 'Oldest' ? styles.activeButton : ''}>Oldest
                                </button>
                                <button onClick={() => setTempSortBy('High Price')}
                                        className={tempSortBy === 'High Price' ? styles.activeButton : ''}>High Price
                                </button>
                                <button onClick={() => setTempSortBy('Low Price')}
                                        className={tempSortBy === 'Low Price' ? styles.activeButton : ''}>Low Price
                                </button>
                            </div>
                            <button className={styles.mainButton} onClick={handleApplyFilters}>Apply Filter</button>
                        </div>
                    </div>
                )}
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id} onClick={() => handleProductClick(product.id)}>
                            <img src={product.img} alt={product.name} width="50" height="50"/>
                            <div className={styles.searchProducts}>
                                <div className={styles.direction}>
                                    {product.name} - ${product.price}
                                </div>
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
        </section>
    );
};

export default Explore;