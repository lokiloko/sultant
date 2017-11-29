const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)

var postedId = ''

var dummyDataUser = {
  name: "anton",
  email: "anton@gmail.com",
  password: "anton"
}

describe('Users route', function() {
  it('Should get all user data', function(done) {
    chai.request(app)
    .get('/users')
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Tampil Semua User")
      res.body.data.should.be.an('array')
      res.body.data.should.have.lengthOf.above(0)
      done()
    })
  })

  it('Should get users data object', function(done) {
    chai.request(app)
    .get('/users')
    .end((err, res) => {
      res.body.data[0].should.have.property('_id')
      res.body.data[0]._id.should.be.a('string')
      res.body.data[0].should.have.property('name')
      res.body.data[0].name.should.be.a('string')
      res.body.data[0].should.have.property('email')
      res.body.data[0].email.should.be.a('string')
      res.body.data[0].should.have.property('password')
      res.body.data[0].password.should.be.a('string')
      done()
    })
  })

  it('Should post user data and return posted user data', function(done) {
    chai.request(app)
    .post('/users')
    .send(dummyDataUser)
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal('Insert Success')
      res.body.data.should.be.an('object')
      res.body.data.data.should.have.property('_id')
      res.body.data.data._id.should.be.a('string')
      res.body.data.data.should.have.property('name')
      res.body.data.data.name.should.be.a('string')
      res.body.data.data.should.have.property('email')
      res.body.data.data.email.should.be.a('string')
      res.body.data.data.should.have.property('password')
      res.body.data.data.password.should.be.a('string')
      postedId = res.body.data.data._id
      done()
    })
  })

  it('Should return token when user login is correct', function(done) {
    chai.request(app)
    .post('/users/login')
    .send({
      email: 'anton@gmail.com',
      password: 'anton'
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Login Success")
      res.body.token.should.be.a('string')
      res.body.token.should.have.lengthOf.above(0)
      done()
    })
  })

  it('Should return error when user login is incorrect', function(done) {
    chai.request(app)
    .post('/users/login')
    .send({
      email: 'antons@gmail.com',
      password: 'antons'
    })
    .end((err, res) => {
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when name / email / password isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      name: '',
      email: '',
      password: 'anton'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return updated user name when only name is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      name: 'medan',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.name.should.equal('medan')
      done()
    })
  })

  it('Should return updated user email when only email is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      email: 'medan@gmail.com',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.email.should.equal('medan@gmail.com')
      done()
    })
  })

  it('Should return hash updated password when only password is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      password: 'medan',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.password.should.have.lengthOf.above(0)
      done()
    })
  })

  it('Should return updated user data when all user data is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      name: 'anton',
      email: 'anton@gmail.com',
      password: 'anton'
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      done()
    })
  })

  it('Should return deleted user data when user is deleted', function(done) {
    chai.request(app)
    .delete(`/users/${postedId}`)
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Delete Success")
      res.body.data.should.be.an('object')
      done()
    })
  })
})
