const express = require('express');
const cors = require('cors');
const rentsRoutes = require('./routes/rents');
const placesRoutes = require('./routes/places');
const paymentRoutes = require('./routes/payment');

require('dotenv').config(); // load env variables

const app = express();

app.use(
  cors({
    origin: process.env.SITE_DOMAIN,
    credentials: true, // if you send cookies/auth headers
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/rents', rentsRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Express backend is running 🚀');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

