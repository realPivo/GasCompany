const Router = require('express');
const customerController = require('../controllers/customerController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', customerController.registration)
router.post('/login', customerController.login)
router.get('/auth', authMiddleware, customerController.check) // is auth


router.get('/', customerController.getAllCustomers)
router.get('/:id', customerController.getCustomer) // get by id
router.post('/', customerController.createCustomer);
router.patch('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);


module.exports = router;