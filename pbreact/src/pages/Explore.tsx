import { useNavigate } from 'react-router-dom';

function Explore() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Bem-vindo à ProductSpecific!</h1>
            <button onClick={() => navigate('/')}>Sair</button>
        </div>
    );
}

export default Explore;
