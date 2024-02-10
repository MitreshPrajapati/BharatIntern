const mongoose = require('mongoose');
var URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: { type: String, slug: "title"}
}, { timestamps: true });

articleSchema.pre('save', function(next){
    this.slug = this.title.split(" ").join("-");
    next();
})

const articleModel = mongoose.model('articles', articleSchema);
module.exports = { articleModel }