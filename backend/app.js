const express = require('express');
const cors = require('cors');
const rentsRoutes = require('./routes/rents');
const placesRoutes = require('./routes/places');
const paymentRoutes = require('./routes/payment');

require('dotenv').config(); // load env variables

const app = express();

app.set('trust proxy', 1); // Trust first proxy (Nginx)

const allowedOrigins = [
  process.env.SITE_DOMAIN,
  process.env.SITE_DOMAIN?.replace('://', '://www.')
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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

