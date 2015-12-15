import User from '../models/User';
import Post from '../models/Post';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

let userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: {type: GraphQLString},
    password: {type: GraphQLString},
    email: {type: GraphQLString},
    _id: {type: new GraphQLNonNull(GraphQLID)}
  }
});
let postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    user: {type: GraphQLString},
    title: {type: GraphQLString},
    score: {type: GraphQLString},
    comments: {type: GraphQLString},
    createdAt: {type: GraphQLInt},
    content: {type: GraphQLString},
    _id: {type: new GraphQLNonNull(GraphQLID)}
  }
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: ({
      getAllUsers: {
        type: new GraphQLList(userType), 
        resolve: () => {
          return User.find({}, (err, users) => {
            console.log(users)
            return users
          })
        }
      },
      getPosts: {
        type: new GraphQLList(postType),
        resolve: () => {
          return Post.find({}, (err, posts) => {
            return posts
          })
        }
      }
    })
  }), 

   mutation: new GraphQLObjectType({
    name : 'Mutation',
    fields: ({
      deleteUser: {
        type: GraphQLString, 
        args: {
          username: { 
            type: GraphQLString }
        }, 
        resolve: (obj, {username}) => {
          console.log(username)
          return User.remove({ username: username }, (err) => {})
        }
      },
      createUser: {
        type: userType,
        args: {
          username: {type: GraphQLString},
          password: {type: GraphQLString},
          email: {type: GraphQLString}
        },
        resolve: (obj, {username, password, email}) => {
          let newUser = new User({username: username, password: password, email: email});
          return newUser.save((err, user) => {
            return user
          })
        }
      }
    })
   })
})

export default schema;
