import * as React from 'react';
import { useEffect, useState } from 'react';
import { ref, onValue, set, get } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import signalIcon from '../../assets/signal-icon.png';
import wifiIcon from '../../assets/wifi-icon.png';
import batteryIcon from '../../assets/battery-icon.png';

const ProductOverview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const productRef = ref(db, 'products/' + id);
        onValue(productRef, (snapshot) => {
            const data = snapshot.val();
            setProduct(data);
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
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.homeBgcolor}>
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
)
    ;
};

export default ProductOverview;