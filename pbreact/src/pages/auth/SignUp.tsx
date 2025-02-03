import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../../../firebaseConfig';
import styles from './Auth.module.css';
import signalIcon from '../../assets/signal-icon.png';
import wifiIcon from '../../assets/wifi-icon.png';
import batteryIcon from '../../assets/battery-icon.png';
import emailIcon from '../../assets/email-icon.png';
import passwordIcon from '../../assets/password-icon.png';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password: string) => {
        return password.length >= 6; // Example password validation
    };

    const handleSignUp = async () => {
        if (!validateEmail(email)) {
            setErrorMessage('Invalid email address');
            setShowPopup(true);
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 6 characters long');
            setShowPopup(true);
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await set(ref(db, 'users/' + user.uid), {
                email: email
            });
            navigate('/home');
        } catch (error) {
            setErrorMessage('Error signing up: ' + error.message);
            setShowPopup(true);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/home');
        } catch (error) {
            setErrorMessage('Error signing in with Google: ' + error.message);
            setShowPopup(true);
        }
    };

    const handleLogin = async () => {
        navigate('/');
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <section id={styles.signBody}>
            <header className={styles.header}>
                <div id={styles.time}>
                    9:41
                </div>
                <div id={styles.icons}>
                    <img src={signalIcon} alt="Signal" className={styles.headerIcon}/>
                    <img src={wifiIcon} alt="WiFi" className={styles.headerIcon}/>
                    <img src={batteryIcon} alt="Battery" className={styles.headerIcon}/>
                </div>
            </header>
            <div className={styles.card}>
                <div className={styles.mainSign}>
                    <div className={styles.title}>Audio</div>
                    <div className={styles.description}>It's modular and designed to last</div>
                </div>
                <div className={styles.mainSignComponents}>
                    <section id={styles.form}>
                        <div className={styles.inputContainer}>
                            <img src={emailIcon} alt="Email Icon" className={styles.inputIcon}/>
                            <input
                                className={styles.inputText}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <img src={passwordIcon} alt="Password Icon" className={styles.inputIcon}/>
                            <input className={styles.inputText}
                                   type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Password"
                            />
                        </div>
                    </section>
                    <div id={styles.resetUp}>Forgot Password</div>
                    <button className={styles.mainButton} onClick={handleSignUp}>Sign In</button>
                    <div id={styles.googleSignDiv}>
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google"/>
                        <div onClick={handleGoogleLogin} className={styles.signGoogle}>Sign in with Google</div>
                    </div>
                </div>
            </div>
            <div className={styles.register}>
                <div>Didn’t have any account?</div>
                <div onClick={handleLogin} className={styles.authControl}>Sign in here</div>
            </div>
            {
                showPopup && (
                    <div className="popup" onClick={closePopup}>
                        <div className="popup-content">
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                )
            }
        </section>
)
    ;
}

export default SignUp;