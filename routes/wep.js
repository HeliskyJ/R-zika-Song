const express = require('express');
let router = express.Router();
const songController = require('../controllers/dataController');

router.route('/')
	.get(songController.index)
    .post(songController.multerMiddle(),songController.create);

router.route('/show/:songId').get(songController.show);
router.route('/edit/:songId').get(songController.edit);
router.route('/update/:songId').post(songController.update);
    

    module.exports = router;