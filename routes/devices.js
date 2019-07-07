const express =  require('express');
const router = express.Router();
const devices = require('../controllers/devices');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', auth, devices.getAll);
router.post('/', admin, devices.create);

module.exports = router;