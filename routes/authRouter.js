const { Router } = require('express');
const authCtrl = require('../controller/userCtrl.js');

const router = Router();

router.post('/api/user', authCtrl.createUser);
router.post('/api/login', authCtrl.login);

module.exports = router;
