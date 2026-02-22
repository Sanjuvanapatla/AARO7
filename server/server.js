const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  );
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
