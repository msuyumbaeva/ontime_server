const express =  require('express');
const router = express.Router();
const actions = require('../controllers/actions');
const auth = require('../middleware/auth');

router.post('/', auth, actions.start);
router.post('/pause', auth, actions.pause);
router.post('/remain', auth, actions.remain);
router.post('/stop', auth, actions.stop);
router.get('/:id', auth, actions.getAll);
router.delete('/:id', auth, actions.delete);

module.exports = router;