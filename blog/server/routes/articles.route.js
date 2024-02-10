const { Router } = require("express");
const { articleModel } = require("../models/articles.model");


const articleRouter = Router();


articleRouter.get('/', async (req, res) => {
    const articles = await articleModel.find();
    if (articles) {
        return res.status(201).json({ data: articles });
    } else {
        res.send({ message: 'No articles found, Create One' });
    }
})

articleRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    //  console.log(article, id);
    if (id) {
        const article = await articleModel.findById(req.params.id);
        console.log(article, id);
        if (!article) {
            res.status(404).json({ message: 'Article Not Found' });
        } else {
            res.send(article);
        }
    }

})
articleRouter.post('/new', async (req, res) => {

    const { title, description, markdown } = req.body;

    const newArticle = new articleModel({
        title,
        description,
        markdown
    });

    try {
        const a = await newArticle.save();
        console.log(a);
        res.send({ message: "Article saved successfully!" });
    } catch (error) {
        res.send(error);
    }
})

module.exports = { articleRouter }