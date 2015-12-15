import express from 'express';
let router = express.Router();
import User from '../models/User'

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, (err, users) => {
    res.status(err ? 400:200).send({users: users, result: 'send all users'});
  })
});

router.post('/create', (req, res) => {
  var newUser = new User(req.body);
  newUser.save(err => {  
    res.status(err ? 400:200).send({result: err || 'user created'})
  });
});

export default router;
