const express = require('express');
let router = express.Router();
const songController = require('../controllers/dataController');

router.route('/')
	.get(songController.index)

    module.exports = router;