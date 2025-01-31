import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://run.mocky.io/v3/99aaba93-3df0-4df0-ac35-bc684ef7653c');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});