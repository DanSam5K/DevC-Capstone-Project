const database = require('../db/config');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

const Article = {

    async addArticle(req, res) {
        const createQuery = `INSERT INTO 
        article(id, title, article, employee_id, image, datePosted)
        VALUES($1,$2,$3,$4,$5,$6)
        returning *`;
        const values = [
            uuidv4(),
            req.body.title,
            req.body.article,
            req.user.id,
            req.body.image,
            moment(new Date())
        ];

        try {
            const { rows } = await database.query(createQuery, values);
            return res.status(201).send(rows[0]);
        } catch(error){
            return res.status(400).send(error);
        }
    },
    async getAllArticles(req, res) {
        const findAllArticles = 'SELECT * FROM articles returning *';
        try {
            const { rows } = await database.query(findAllArticles);
            return res.status(200).send({ rows });
        } catch(error) {
            return res.status(400).send({
                'message': 'A very costly error occurred'
            });
        }
    }, 
    
    async getSpecificArticle(req, res) {
        const getOne = 'SELECT * FROM article WHERE id=$1 returning *';
        try {
            const { rows } = await database.query(getOne, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    'message': 'Oops article not found'
                });
            }
            return res.status(200).send(rows[0]);
        } catch(error) {
            return res.status(400).send({
                'message': 'A costly error occured 2'
            });
        }
    },

    async deleteArticle(req, res) {
        const deleteQuery = 'DELETE FROM article WHERE id=$1 returning *';
        try {
            const { rows } = await database.query(deleteQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    'message': 'Oops attempt to remove an article that does not exist'
                });
            }
            return res.status(204).send({
                'message': 'Article deleted'
            });
        } catch(error) {
            return res.status(400).send({
                'message': 'A costly error occured 3'
            });
        }
    }, 

    async updateArticle(req, res) {
        const getOne = 'SELECT * FROM article WHERE id=$1';
        const updateQuery = `UPDATE article
         SET title=$1, article=$2, image=$3, datePosted=$3 WHERE id=$4 returning *`;
         try {
             const { rows } = await database.query(getOne, [req.params.id, req.user.id]);
             if(!rows[0]) {
                 return res.status(404).send({
                     'message': 'Article not found'
                 });
             }
             const values = [
                 req.body.title || rows[0].title,
                 req.body.article || rows[0].article,
                 req.body.image || rowss[0].image,
                 moment(new Date()),
                 req.params.id
             ];
             const response =await database.query(updateQuery, values);
             return res.status(201).status(response.rows[0]);
         } catch(error) {
             return res.status(400).send({
                 'message': 'A costly error occured 4'
             });
         }
    },

    async commentOnArticle(req, res) {
        const getOne = 'SELECT * FROM article WHERE id=$1';
        const commentQuery = `INSERT INTO comment(id, comment,article_id,user_id)
        VALUES($1,$2,$3,$) returning *`;
        try {
            const { rows } = await database.query(getOne, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    'message': 'Article not found'
                });
            }
            const values = [
                uuidv4(),
                req.body.comment,
                moment(new Date()),
                req.article.id,
                req.user.id
            ];

            const response = await database.query(commentQuery, values);
            return res.status(201).send({
                'message': 'Successfully added comment'
            });
        } catch(error) {
            return res.status(400).send({
                'message': 'A costly error occured 5'
            });
        }

    }
    
}

module.exports = Article;