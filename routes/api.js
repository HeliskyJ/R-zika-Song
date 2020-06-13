const express = require('express');
let router = express.Router();
const songController = require('../controllers/SongsControllers');

router.route('/')
	.get(songController.index)
	.post(songController.multerMiddle(),
	songController.create,
	songController.saveImage)

router.route('/:songId')
	.get(songController.show)
	.patch(songController.update)
	.delete(songController.destroy);

    module.exports = router;