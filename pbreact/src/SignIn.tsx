import { useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Bem-vindo à SignIn!</h1>
            <button onClick={() => navigate('/')}>Sair</button>
        </div>
    );
}

export default SignIn;
