import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/User';

let expect = chai.expect;
chai.use(chaiHttp);

import app from '../app';
let chaiApp = chai.request(app);

let clearDB = done => {
  User.remove({}, err => {
    done();
  });
}

describe('5', () => {
  it('should have value 5', () => {
    expect(5).to.equal(5);
  })
});

describe('/test', () => {
  it('Should send hello world', done => {
    chaiApp
      .get('/test')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.equal('Hello World');
        done();
      })
  })
});

describe('/users', () => {
  it('Should create user', done => {
    chaiApp
    .post('/users/create')
    .send({username: 'titties', password: 'assntitties', email: 'ass@tits.com'})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.result).to.equal('user created');
      done();
    })
  })
  it('Should create user', done => {
    chaiApp
    .post('/users/create')
    .send({password: 'assntitties', email: 'ass@tits.com'})
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    })
  })
  it('should get all users', done => {
    chaiApp
    .post('/graphql')
    .send({
      query: `{
          getAllUsers {
            _id
            username
            password
            email
          }
        }` 
    })
    .end((err, res) => {
      let users = res.body.data.getAllUsers;
      expect(res).to.have.status(200);
      expect(users[0].username).to.equal('titties');
      done();
    })
  })
  it('should delete a user', done => {
    chaiApp
    .post('/graphql')
    .send({
      query: `
       	mutation {
  				deleteUser(username: "titties")
				} 
      `, 
      params: {
        name: "titties"
      }
    })
    .end((err, res) => {
      let data = JSON.parse(res.text);
      let valid = JSON.parse(data.data.deleteUser);
      expect(valid.ok).to.equal(1);
      done();
    })
  })
  it('should create a user', done => {
    chaiApp
    .post('/graphql')
    .send({
      query: `
				mutation {
				  createUser(username: "titties", password: "hahaha", email: "titsandnipples"){
				    email
				    username
				    password
				    _id    
				  }
				}
      `, 
      params: {
        name: "titties"
      }
    })
    .end((err, res) => {
      let data = res.body.data.createUser;
      expect(data.username).to.equal('titties')
      done();
    })
  })
});

describe('Should get posts', () => {
  it('should get posts', done => {
    chaiApp
    .post('/graphql')
    .send({
      query: `{
        getPosts {
          user
          title
          score
          comments
          createdAt
          content
        }
      }
      `
    })
    .end((err, res) => {
      console.log(res.body.data.getPosts.length);
      expect(res.body.data.getPosts.length).to.equal(2);
      done();
    })
  })
})

