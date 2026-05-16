// Ruta rutosa
const router = require('express').Router();
const marketRoutes = require('./market');

router.get('/test', (req, res) => {
  res.json({ ok: true });
});

// Add market routes
router.use(marketRoutes);

module.exports = router;