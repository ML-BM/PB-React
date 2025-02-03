import * as React from 'react';
import { useEffect, useState } from 'react';
import { ref, onValue, set, get } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductOverview.module.css';
import signalIcon from '../../assets/signal-icon-dark.png';
import wifiIconDarker from '../../assets/wifi-icon-dark.png';
import batteryIcon from '../../assets/battery-icon-dark.png';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';
import menu from '../../assets/menu-variant.png';
import search from '../../assets/search.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductOverview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const productRef = ref(db, 'products/' + id);
        onValue(productRef, (snapshot) => {
            const data = snapshot.val();
            setProduct(data);
        });

        const productsRef = ref(db, 'products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productList = data ? Object.values(data) : [];
            setProducts(productList);
        });
    }, [id]);

    const handleAddToCart = async () => {
        if (product) {
            const cartRef = ref(db, `cart/${product.id}`);
            const cartSnapshot = await get(cartRef);
            const cartItem = cartSnapshot.val();
            if (cartItem) {
                await set(cartRef, { ...cartItem, quantity: (cartItem.quantity || 1) + 1 });
            } else {
                await set(cartRef, { ...product, quantity: 1 });
            }
            setMessage('Item added in your cart.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleProductClick = (id: string) => {
        navigate(`/overview/${id}`);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

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
                <img src={menu} alt="Menu"/>
                <img src={logo} alt="Logo"/>
                <img src={avatar} alt="Avatar"/>
            </div>
            <div className={styles.homeBgcolor}>
                <h5>
                    Featured Products
                    <a href="/explore" style={{marginLeft: '10px'}}>See All</a>
                </h5>
                <ul id="ulOverview">
                    {products.map((product) => (
                        <li key={product.id} onClick={() => handleProductClick(product.id)}>
                            <img src={product.img} alt={product.name} width="50" height="50"/>
                            <div>{product.name}</div>
                            <div>${product.price}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ProductOverview;