const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth');
const Gif = require('../controllers/Gif');


router.post('/', Auth, Gif.addGif);
router.post('/:id', Auth, Gif.commentOnGif);
router.delete('/:id', Auth, Gif.deleteGif);

module.exports = router;
