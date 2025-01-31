import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Bem-vindo à Cart!</h1>
            <button onClick={() => navigate('/')}>Sair</button>
        </div>
    );
}

export default Cart;
