import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Lógica de login (pode ser integrada depois)
        navigate('/home'); // Redireciona para a Home
    };

    return (
        <div className="card">
            <h2>Login</h2>
            <div>
                <label>
                    Usuário:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Digite seu usuário"
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
        </div>
    );
}

export default App;
