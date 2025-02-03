import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import styles from './Auth.module.css';
import signalIcon from '../../assets/signal-icon.png';
import wifiIcon from '../../assets/wifi-icon.png';
import batteryIcon from '../../assets/battery-icon.png';
import emailIcon from '../../assets/email-icon.png';
import passwordIcon from '../../assets/password-icon.png';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/home');
        } catch (error) {
            console.error('Erro ao fazer login com o Google:', error);
        }
    };

    const handleRegister = async () => {
        navigate('/signup');
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
                    <div id={styles.resetIn}>Forgot Password</div>
                    <button className={styles.mainButton} onClick={handleLogin}>Sign In</button>
                    <div id={styles.googleSignDiv}>
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google"/>
                        <div onClick={handleGoogleLogin} className={styles.signGoogle}>Sign in with Google</div>
                    </div>
                </div>
            </div>
            <div className={styles.register}>
                <div>Didn’t have any account?</div>
                <div onClick={handleRegister} className={styles.authControl}>Sign up here</div>
            </div>
        </section>
    );
}

export default SignIn;