const moment = require('moment');
const uuid = require('uuid');

class Article {
    constructor() {
        this.articles = [];
    }

    create(data) {
        const newArticle = {
            id: uuid.v4(),
            title: data.title,
            article: data.article,
            datePosted: moment.now()
        };
        this.articles.push(newArticle);
        return newArticle;
    }

    findOne(id) {
        return this.articles.find(article => article.id === id);
    }
    
    findAll() {
        return this.articles;
    }

    update(id, data) {
        const postArticle = this.findOne(id);
        const index = this.articles.indexOf(postArticle);
        this.articles[index].title = data['title'] || postArticle.title;
        this.articles[index].article = data['article'] || postArticle.article;
        this.articles[index].datePosted = moment.now();
    }

    delete(id) {
        const article = this.findOne(id);
        const index = this.articles.indexOf(article);
        this.articles.splice(index, 1);
    }
}

export default new Article();