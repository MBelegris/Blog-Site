const Post = require('../models/post-model');

// createPost, updatePost, deletePost, getPostById, getPosts

createPost = (req, res) => {

    const body = req.body;

    if (!body) {
        return res.status(400).json( { success: false, error: "You must provide a Post"});
    }

    const post = new Post(body);

    if (!post) {
        return res.status(400).json( { success: false, error: err});
    }

    post
        .save()
        .then(() => {
            return res.status(200).json( {success: true, id: post._id, message: "Post created!"});
        })
        .catch (err => {
            return res.status(400).json( {success: false, error: err});
        })
}

updatePost = async (req,res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json( { success: false, error: "You must provide a Post"});
    }

    Post.findOne( {_id: req.params.id}, (err, post) => {
        if (err) {
            return res.status(404).json({err, message: 'Post not found!'});
        }

        post.title = body.title;
        post.content = body.content;
        post.author = body.author;
        post.datePosted = body.datePosted;

        post
            .save()
            .then(() => {
                return res.status(200).json( {success: true, id: post._id, message: "Post updated!"});
            })
            .catch( err => {
                return res.status(400).json( {success: false, error: err});
            })

    })
}

deletePost = async (req,res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json( { success: false, error: "You must provide a Post"});
    }

    Post.findOneAndDelete({_id: req.params.id}, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!post) {
            return res.status(404).json({ success: false, error: `Post not found` });
        }

        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(`Error: ${err}`));
}

getPostById = async (req,res) => {
    await Post.findOne({_id: req.params.id}, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!post) {
            return res.status(404).json({ success: false, error: `Post not found` });
        }
        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(err));
}

getPosts = async (req,res) => {
    await Post.find({}, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!posts.length) {
            return res.status(404).json({ success: false, error: `Post not found` });
        }
        return res.status(200).json({ success: true, data: posts });
    }).catch(err => console.log(err));
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getPosts
}

