import { useNavigate } from 'react-router-dom';

function ProductOverview() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Bem-vindo à ProductOverview!</h1>
            <button onClick={() => navigate('/')}>Sair</button>
        </div>
    );
}

export default ProductOverview;
