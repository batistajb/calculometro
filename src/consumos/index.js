const express = require('express');
const router = express.Router();

router.get('/', require('./list'));
router.get('/consumos', require('./listJson'));

module.exports = router;
