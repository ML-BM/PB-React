import * as React from 'react';
import { useEffect, useState } from 'react';
import { ref, onValue, set, remove, get } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import styles from './Cart.module.css';
import signalIcon from '../../assets/signal-icon-dark.png';
import wifiIconDarker from '../../assets/wifi-icon-dark.png';
import batteryIcon from '../../assets/battery-icon-dark.png';
import trash from '../../assets/trash-icon.png';
import BackButton from "../../components/BackButton";

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        const cartRef = ref(db, 'cart');
        onValue(cartRef, (snapshot) => {
            const data = snapshot.val();
            const cartList = data ? Object.values(data) : [];
            setCartItems(cartList);
        });
    }, []);

    const handleIncreaseQuantity = async (id: string) => {
        const itemRef = ref(db, `cart/${id}`);
        const itemSnapshot = await get(itemRef);
        const item = itemSnapshot.val();
        await set(itemRef, { ...item, quantity: (item.quantity || 1) + 1 });
    };

    const handleDecreaseQuantity = async (id: string) => {
        const itemRef = ref(db, `cart/${id}`);
        const itemSnapshot = await get(itemRef);
        const item = itemSnapshot.val();
        if (item.quantity > 1) {
            await set(itemRef, { ...item, quantity: item.quantity - 1 });
        } else {
            await remove(itemRef);
        }
    };

    const handleRemoveItem = async (id: string) => {
        const itemRef = ref(db, `cart/${id}`);
        await remove(itemRef);
    };

    const handleRemoveAll = async () => {
        const cartRef = ref(db, 'cart');
        await remove(cartRef);
    };

    const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

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
                <p> Search</p>
                <img src={trash} alt="Trash"/>
            </div>
            <div className={styles.itens}>
                {cartItems.length === 0 ? (
                    <p>The cart is empty</p>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    <img src={item.img} alt={item.name} width="50" height="50"/>
                                    <p>{item.name} - ${item.price}</p>
                                    <p>Quantity: {item.quantity || 1}</p>
                                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <p>Total: {totalItems} items</p>
                        <p>USD: ${totalPrice.toFixed(2)}</p>
                        <button onClick={handleRemoveAll}>Remove all</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;