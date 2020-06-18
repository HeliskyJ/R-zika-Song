const express = require('express');
let router = express.Router();
const songController = require('../controllers/dataController');

router.route('/')
	.get(songController.index)
    .post(songController.multerMiddle(),songController.create);

router.route('/show/:songId').get(songController.show);
router.route('/edit/:songId').get(songController.edit);
router.route('/update/:songId').post(songController.update);
router.route('/remove/:songId').get(songController.remove);
router.route('/destroy/:songId').post(songController.destroy);
    

    module.exports = router;