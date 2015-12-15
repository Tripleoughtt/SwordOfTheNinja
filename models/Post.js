import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let postSchema = Schema({
  user: {type: String, required: true},
  title: {type: String, required: true},
  comments: {type: String},
  createdAt: {type: Date, default: Date.now(), required: true},
  content: {type: String, required: true},
  score: {type: Number, required: true}
});

let Post = mongoose.model('Post', postSchema);
export default Post;
