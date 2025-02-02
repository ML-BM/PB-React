import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import './Auth.css';
import '../../Global.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
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
        <section id="signBody">
            <div className="card">
                <div className="mainSign">
                    <div className="title">Audio</div>
                    <div className="description">It's modular and designed to last</div>
                </div>
                <section id="form">
                    <div className={"inputInfo"}>
                        <input className={"inputText"}
                               type="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="Email"
                        />
                    </div>
                    <div className={"inputInfo"}>
                        <input className={"inputText"}
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Password"
                        />
                    </div>
                </section>
                <div className="reset">Forgot Password</div>

                <button className="mainButton" onClick={handleLogin}>Sign In</button>
                <div id="googleSignIn">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
                    <div className="signIn">Sign in with Google</div>
                </div>
                <button onClick={handleGoogleLogin}>Entrar com Google</button>
                <button onClick={handleRegister}>Registrar</button>
            </div>
        </section>
    );
}

export default SignIn;