import express from 'express';
let router = express.Router();
import Post from '../models/Post'

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, (err, posts) => {
    res.status(err ? 400:200).send({posts: posts, result: 'send all posts'});
  })
});

router.post('/create', (req, res) => {
  var newPost = new Post(req.body);
  console.log(newPost)
  newPost.save(err => {  
    res.status(err ? 400:200).send({result: err || 'Post created'})
  });
});

export default router;
