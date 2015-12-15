import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let userSchema = Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});

let User = mongoose.model('User', userSchema);
export default User;
