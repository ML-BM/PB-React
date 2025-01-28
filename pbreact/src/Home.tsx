import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Bem-vindo à Home!</h1>
            <button onClick={() => navigate('/')}>Sair</button>
        </div>
    );
}

export default Home;
