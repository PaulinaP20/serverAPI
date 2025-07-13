const express = require('express');
const cors = require('cors');
const path = require('path');


const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res ) => {
    res.status(404).json({error: 'not found...'})
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});