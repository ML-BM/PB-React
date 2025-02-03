import * as React from 'react';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './Home.module.css';
import signalIcon from '../../assets/signal-icon-dark.png';
import wifiIconDarker from '../../assets/wifi-icon-dark.png';
import batteryIcon from '../../assets/battery-icon-dark.png';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';
import menu from '../../assets/menu-variant.png';
import search from '../../assets/search.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Product {
    id: string;
    name: string;
    category: string;
    img: string;
    price: number;
    reviews: { rating: number }[];
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('headphones');
    const [randomHeadphone, setRandomHeadphone] = useState<Product | null>(null);
    const [randomHeadset, setRandomHeadset] = useState<Product | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const productsRef = ref(db, 'products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productList: Product[] = data ? Object.values(data) as Product[] : [];
            setProducts(productList.slice(0, 2)); // Show only 2 products

            const headphones = productList.filter((product) => product.category === 'headphones');
            const headsets = productList.filter((product) => product.category === 'headsets');

            if (headphones.length > 0) {
                setRandomHeadphone(headphones[Math.floor(Math.random() * headphones.length)]);
            }

            if (headsets.length > 0) {
                setRandomHeadset(headsets[Math.floor(Math.random() * headsets.length)]);
            }
        });
    }, []);

    const handleSearch = () => {
        navigate('/search', { state: { searchTerm } });
    };

    const handleProductClick = (id: string) => {
        navigate(`/overview/${id}`);
    };

    const handleShopNow = () => {
        navigate('/explore', { state: { category: activeTab } });
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // Mostrar 2 slides por vez
        slidesToScroll: 1
    };

    return (
        <section>
            <header className={styles.header}>
                <div id={styles.time}>
                    9:41
                </div>
                <div id={styles.icons}>
                    <img src={signalIcon} alt="Signal" className={styles.headerIcon}/>
                    <img src={wifiIconDarker} alt="WiFi" className={`${styles.headerIcon} ${styles.wifiIconDarker}`} />
                    <img src={batteryIcon} alt="Battery" className={styles.headerIcon}/>
                </div>
            </header>

            <div className={styles.secHeader}>
                <img src={menu} alt="Menu"/>
                <img src={logo} alt="Logo"/>
                <img src={avatar} alt="Avatar"/>
            </div>

            <div>
                <div className={styles.searchText}>
                    <h5>Hi, User</h5>
                    <h3 >What are you looking for today?</h3>
                </div>
                <div id={styles.inputContainer}>
                    <img src={search} alt="Search" onClick={handleSearch}  className={styles.inputIcon}/>
                    <input className={styles.inputText}
                           type="text"
                           placeholder="Search by name"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.homeBgcolor}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                        <button
                            className={activeTab === 'headphones' ? styles.mainButton : styles.mainButtoninative}
                            onClick={() => setActiveTab('headphones')}
                        >
                            Headphone
                        </button>
                        <button
                            className={activeTab === 'headsets' ? styles.mainButton : styles.mainButtoninative}
                            onClick={() => setActiveTab('headsets')}
                        >
                            Headset
                        </button>
                    </div>
                    <div className={"slider"}>
                        <Slider {...settings}>
                            <div className={styles.productBg}>
                                {activeTab === 'headphones' && randomHeadphone && (
                                    <div className={styles.productGrid}>
                                        <div className={styles.productInfo}>
                                            <h2>{randomHeadphone.name}</h2>
                                            <a href="#" onClick={handleShopNow}>
                                                Shop Now
                                                <svg className={styles.arrowIcon} width="16" height="16"
                                                     viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <img src={randomHeadphone.img} alt={randomHeadphone.name} width="100"
                                                 height="100"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                {activeTab === 'headsets' && randomHeadset && (
                                    <div className={styles.productGrid}>
                                        <div className={styles.productInfo}>
                                            <h2>{randomHeadset.name}</h2>
                                            <a href="#" onClick={handleShopNow}>Shop Now</a>
                                        </div>
                                        <img src={randomHeadset.img} alt={randomHeadset.name} width="100" height="100"/>
                                    </div>
                                )}
                            </div>
                        </Slider>
                    </div>
                    <h5>
                        Featured Products
                        <a href="/explore" style={{marginLeft: '10px'}}>See All</a>
                    </h5>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id} onClick={() => handleProductClick(product.id)}>
                                <img src={product.img} alt={product.name} width="50" height="50"/>
                                <div>{product.name}</div>
                                <div>${product.price}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Home;