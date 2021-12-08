const Post = require('../models/post-model');
const logger = require('../Logger')

createPost = (req, res) => {
    logger.info(`Attempting Post Creation`);
    const body = req.body;

    if (!body) {
        logger.error(`Failed Post Creation: No Post provided`);
        return res.status(400).json( { success: false, error: "You must provide a Post"});
    }

    const post = new Post(body);

    if (!post) {
        logger.error(`Failed Post Creation: ${err}`);
        return res.status(400).json( { success: false, error: err});
    }

    post
        .save()
        .then(() => {
            logger.info(`Successful Post Creation`);
            return res.status(200).json( {success: true, id: post._id, message: "Post created!"});
        })
        .catch (err => {
            logger.error(`Failed Post Creation: ${err}`);
            return res.status(400).json( {success: false, error: err});
        })
}

updatePost = async (req,res) => {
    logger.info(`Attempting to Update Post`);
    const body = req.body;

    if (!body) {
        logger.error(`Failed Post Creation: No Post was provided`);
        return res.status(400).json( { success: false, error: "You must provide a Post"});
    }

    // looks for a post with the id received in the request
    Post.findOne( {_id: req.params.id}, (err, post) => {
        if (err) {
            logger.error(`Failed Post Creation: Post Not Found`);
            return res.status(404).json({err, message: 'Post not found!'});
        }

        post.title = body.title;
        post.content = body.content;
        post.author = body.author;
        post.datePosted = body.datePosted;

        post
            .save()
            .then(() => {
                logger.info(`Successful Post Creation`);
                return res.status(200).json( {success: true, id: post._id, message: "Post updated!"});
            })
            .catch( err => {
                logger.error(`Failed Post Creation: ${err}`);
                return res.status(400).json( {success: false, error: err});
            })

    })
}

deletePost = async (req,res) => {
    logger.info(`Attempting to Delete Post`);

    const body = req.body;

    if (!body) {
        logger.error(`Failed to Delete Post: No Post Provided`);
        return res.status(400).json( { success: false, error: "You must provide a Post"});
    }

    Post.findOneAndDelete({_id: req.params.id}, (err, post) => {
        if (err) {
            logger.error(`Failed to Delete Post: ${err}`);
            return res.status(400).json({ success: false, error: err });
        }

        if (!post) {
            logger.error(`Failed to Delete Post: Post Not Found`);
            return res.status(404).json({ success: false, error: `Post not found` });
        }

        logger.info(`Successfully Deleted Post`);
        return res.status(200).json({ success: true, data: post });
    }).catch(err => {
        logger.error(`Failed to Delete Post: ${err}`);
        console.log(`Error: ${err}`);
    });
}

getPostById = async (req,res) => {
    logger.info(`Attempting to Get Post By ID`);
    await Post.findOne({_id: req.params.id}, (err, post) => {
        if (err) {
            logger.error(`Failed to Get Post By ID: ${err}`);
            return res.status(400).json({ success: false, error: err });
        }

        if (!post) {
            logger.error(`Failed to Get Post By ID: Post Not Found`);
            return res.status(404).json({ success: false, error: `Post not found` });
        }

        logger.info(`Successfully got Post By ID`);
        return res.status(200).json({ success: true, data: post });
    }).catch(err => {
        logger.error(`Failed to Get Post By ID: ${err}`);
        console.log(err);
    });
}

getPosts = async (req,res) => {
    logger.info(`Attempting to get All Posts`);
    await Post.find({}, (err, posts) => {
        if (err) {
            logger.error(`Failed to get All Posts: ${err}`);
            return res.status(400).json({ success: false, error: err });
        }
        if (!posts.length) {
            logger.error(`Failed to get All Posts: Post not Found`);
            return res.status(404).json({ success: false, error: `Post not found` });
        }
        logger.info(`Successfully got all posts`);
        return res.status(200).json({ success: true, data: posts });
    }).catch(err => {
        logger.error(`Failed to get All Posts: ${err}`);
        console.log(err);
    });
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getPosts
}

