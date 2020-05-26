const express = require('express');

const modulesControllers = require('../controllers/modules-controller');

const router = express.Router();


router.get('/:mid', modulesControllers.getModuleById);

router.get('/user/:uid', modulesControllers.getModulesByUserId);

router.post('/', modulesControllers.createModule );

router.patch('/:mid', modulesControllers.updateModule);

router.delete('/:mid', modulesControllers.deleteModule);

module.exports = router;