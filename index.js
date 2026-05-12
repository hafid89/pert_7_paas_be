const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', noteRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Notes API is running',
        endpoints: {
            getAll: 'GET /api/notes',
            getById: 'GET /api/notes/:id',
            create: 'POST /api/notes',
            update: 'PUT /api/notes/:id',
            delete: 'DELETE /api/notes/:id'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}`);
});
