const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose'); // <-- dodane

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect('mongodb://127.0.0.1:27017/NewWaveDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log('✅ Connected to MongoDB'));
db.on('error', (err) => console.log('❌ MongoDB connection error:', err));

app.use((req, res, next) => {
  req.io = io;
  next();
})

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'not found...' });
});

io.on('connection', (socket) => {
  console.log('New socket connected:', socket.id);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🌐 Server is running on port: ${PORT}`);
});
