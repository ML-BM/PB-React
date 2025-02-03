import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('https://run.mocky.io/v3/04aaff29-efd8-42a6-97f5-4befd1e7e5b7');
        const data = response.data;
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();