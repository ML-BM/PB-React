import { useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Bem-vindo à Search!</h1>
            <button onClick={() => navigate('/')}>Sair</button>
        </div>
    );
}

export default Search;
