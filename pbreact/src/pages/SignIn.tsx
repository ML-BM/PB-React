import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig.ts';

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
        <div className="card">
            <h2>Sign In</h2>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                </label>
            </div>
            <div>
                <label>
                    Senha:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                </label>
            </div>
            <button onClick={handleLogin}>Entrar</button>
            <button onClick={handleGoogleLogin}>Entrar com Google</button>
            <button onClick={handleRegister}>Registrar</button>
        </div>
    );
}

export default SignIn;
