const Router = require('express');
const router = new Router();

const customerRouter = require('./customerRouter');
const counterRouter = require('./counterRouter');


router.use('/customer', customerRouter)
router.use('/counter', counterRouter)

module.exports = router;