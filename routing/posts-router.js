const express = require('express');
const router = express.Router();
const Posts = require('../data/db.js');

/*
findPostComments(): the findPostComments accepts a postId as its first parameter and returns all comments on the post associated with the post id.
findCommentById(): accepts an id and returns the comment associated with that id.
insertComment(): calling insertComment while passing it a comment object will add it to the database and return an object with the id of the inserted comment. The object looks like this: { id: 123 }. This method will throw an error if the post_id field in the comment object does not match a valid post id in the database.
 */

router.post('/', (req, res) => { //req = request; res = response
    const info = req.body;
    if (!(info.title && info.contents)) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'});
    } else {
        Posts.insert(info).then(post => {
            res.status(201).json(post);
        }).catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: 'There was an error while saving the post to the database'});
        });
    }
});

router.post('/:id/comments', (req, res) => {
    const info = req.body;
    if (!(info.text)) {
        res.status(400).json({errorMessage: 'Please provide text for the comment.'});
    } else {
        Posts.insertComment(info).then(comment => {
            res.status(201).json(comment);
        }).catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: 'There was an error while saving the comment to the database'});
        });
    }
});

router.get('/', (req, res) => {
    Posts.find().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: 'The posts information could not be retrieved.'});
    });
});


router.get('/:id', (req, res) => {
    const {id} = req.params;
    Posts.findById(id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({errorMessage: 'The post with the specified ID does not exist.'});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: 'The posts information could not be retrieved.'});
    });
});

router.get('/:id/comments', (req, res) => {
    const {id} = req.params;
    Posts.findCommentById(id).then(comment => {
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({errorMessage: 'The post with the specified ID does not exist.'});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: 'The comments information could not be retrieved.'});
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Posts.remove(id).then(removedPost=> {
        if (removedPost) {
            res.status(200).json(removedPost);
        } else {
            res.status(404).json({errorMessage: 'The post with the specified ID does not exist.'});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: 'The post could not be removed'});
    });
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const info = req.body;
    if (!(info.title && info.contents)) { //validation of name & bio
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'});
    } else {
        Posts.update(id, info).then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({errorMessage: 'The post with the specified ID does not exist.'});
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: 'The post information could not be modified.'});
        });
    }
});

//export
module.exports = router;