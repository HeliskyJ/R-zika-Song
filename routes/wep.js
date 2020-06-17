const express = require('express');
let router = express.Router();
const songController = require('../controllers/dataController');

router.route('/')
	.get(songController.index)
    .post(songController.multerMiddle(),songController.create);

router.route('/show/:songId').get(songController.show);
    

    module.exports = router;