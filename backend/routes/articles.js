const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth');
const Article = require('../controllers/article');

//const Articles = process.env.Type === 'db' ? Article: '';

router.post('/', auth, Article.addArticle);
router.post('/:id', auth, Article.commentOnArticle);
router.get('/', auth, Article.getAllArticles);
router.get('/:id', auth, Article.getSpecificArticle);
router.put('/:id', auth, Article.updateArticle);
router.delete('/:id', auth, Article.deleteArticle);

module.exports = router;

