const express =  require('express');
const router = express.Router();
const users = require('../controllers/users');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

router.get('/', auth, users.getAll);
router.post('/', admin, users.create);
router.post('/auth', users.auth);

module.exports = router;