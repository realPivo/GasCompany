const Router = require('express');
const router = new Router();
const counterController = require('../controllers/counterController');


router.post('/', counterController.create)
router.get('/', counterController.getAll)
router.get('/:id', counterController.getById)
router.patch('/:id', counterController.updateCounter);
router.delete('/:id', counterController.deleteCounter);

module.exports = router;