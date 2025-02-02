import * as React from 'react';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://run.mocky.io/v3/04aaff29-efd8-42a6-97f5-4befd1e7e5b7');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Dados da API</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;