const router = require('express').Router();

const controller = require('./controller');

router.get('/', controller.get);
router.get('/all', controller.getAll);
router.post('/create', controller.create);
router.post('/remove', controller.remove);
router.post('/edit', controller.edit);

module.exports = router;
