import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Bem-vindo à SignUp!</h1>
            <button onClick={() => navigate('/')}>Sair</button>
        </div>
    );
}

export default SignUp;
