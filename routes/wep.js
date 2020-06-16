const express = require('express');
let router = express.Router();
const songController = require('../controllers/dataController');

router.route('/')
	.get(songController.index)
    .post(songController.multerMiddle(),songController.create)

    
    module.exports = router;