// const { post } = require("../routes/users");
import  post  from "../routes/users.js";
const posts = [
    { id : 1, name : 'abdi', content : 'abdi is student'},
    { id : 2, name : 'mudey', content : 'mudey is father'}
]

export const getPost = async (req, res) => {
    res.json(posts);
}

export const getPostInfo = async (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
};