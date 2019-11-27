const database = require('../db/config');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

const gif = {
    async addGif(req, res) {
        const createQuery = `INSERT INTO 
        gif(id, title, gifImg, user_id, datePosted)
        VALUES($1,$2,$3,$4,$5)
        returning *`;
        const values = [
            uuidv4(),
            req.body.title,
            req.body.gifImg,
            req.user.id,
            moment(new Date())
        ];

        try {
            const { rows } = await database.query(createQuery, values);
            return res.status(201).send(rows[0]);
        } catch(error){
            return res.status(400).send(error);
        }
    },
    async deleteGif(req, res) {
        const deleteQuery = 'DELETE FROM gif WHERE id=$1 AND user_id = $2returning *';
        try {
            const { rows } = await database.query(deleteQuery, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    'message': 'Oops attempt to remove a gif that does not exist'
                });
            }
            return res.status(204).send({
                'message': 'Gif deleted'
            });
        } catch(error) {
            return res.status(400).send(error);
        }
    }, 

    async commentOnGif(req, res) {
        const getOne = 'SELECT * FROM gif WHERE id=$1';
        const commentQuery = `INSERT INTO comment(id, comment,gif_id,user_id)
        VALUES($1,$2,$3,$) returning *`;
        try {
            const { rows } = await database.query(getOne, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    'message': 'Gif not found'
                });
            }
            const values = [
                uuidv4(),
                req.body.comment,
                moment(new Date()),
                req.gif.id,
                req.user.id
            ];

            const response = await database.query(commentQuery, values);
            return res.status(201).send({
                'message': 'Successfully added comment'
            });
        } catch(error) {
            return res.status(400).send(error);
        }

    }
}

module.exports = gif;