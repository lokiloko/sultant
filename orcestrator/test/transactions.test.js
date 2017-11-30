var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var app = require('../app')
chai.use(chaiHttp)
let newid = ''
describe('transactions route', function(){
  it('should return false if user not valid', function (done) {
  chai.request(app)
  .post('/transactions')
  .send({
    user:'',
    items: [
      {
      name:'susu',
      category: 'drink',
      qty: 1,
      price: 100000
      },
      {
      name:'popok',
      category: 'kids',
      qty: 1,
      price: 50000
      }
    ],
    totalPrice: 150000,
  })
  .end(function (err, response) {
    response.status.should.equal(400)
    done()
  })
})

//
//   it('should return false if totalPrice not same as sum(item.price)', function (done) {
//   chai.request(app)
//   .post('/transactions')
//   .send({
//     user:'1234',
//     items: [
//       {
//       name:'susu',
//       category: 'drink',
//       qty: 1,
//       price: 100000
//       },
//       {
//       name:'popok',
//       category: 'kids',
//       qty: 1,
//       price: 50000
//       }
//     ],
//     totalPrice: 100000,
//   })
//   .end(function (err, response) {
//     response.status.should.equal(400)
//     done()
//   })
// })


  it('should return false if have no item', function (done) {
  chai.request(app)
  .post('/transactions')
  .send({
    user:'5a1e8b34261a720002687e06',
    totalPrice: 150000,
  })
  .end(function (err, response) {
    response.status.should.equal(400)
    done()
  })
})


  it('should return new transaction, after they\'re saved to the database', function (done) {
  chai.request(app)
  .post('/transactions')
  .send({
    user:'5a1e8b34261a720002687e06',
    items: [
      {
        name:'susu',
        category: 'drink',
        qty: 1,
        price: 100000
      },
      {
        name:'popok',
        category: 'kids',
        qty: 1,
        price: 50000
      }
    ],
    totalPrice: 150000,
  })
  .end(function (err, response) {
    newid=response.body.data._id
    response.status.should.equal(200)
    response.body.should.be.an('object')
    response.body.data.should.have.property('_id')
    response.body.data.should.have.property('user')
    response.body.data.user.should.equal('5a1e8b34261a720002687e06')
    response.body.data.should.have.property('date')
    response.body.data.should.have.property('items')
    response.body.data.items.should.be.an('array')
    response.body.data.items.should.have.lengthOf(2)
    response.body.data.should.have.property('totalPrice')
    response.body.data.totalPrice.should.equal(150000)
    done()
  })
})



  it('should return all list transaction',function (done){
    chai.request(app)
    .get('/transactions')
    .end(function (err, response){
      response.status.should.equal(200)
      response.body.should.be.an('array')
      response.body[0].should.have.property('_id')
      response.body[0].should.have.property('user')
      response.body[0].should.have.property('date')
      response.body[0].should.have.property('items')
      response.body[0].items.should.be.an('array')
      response.body[0].should.have.property('totalPrice')
      done()
    })
  })

  it('should return transaction data by user', function (done) {
    chai.request(app)
    .get('/transactions/byuser/5a1e8b34261a720002687e06')

    .end(function (err, response) {
      response.status.should.equal(200)
      response.body.should.be.an('array')
      response.body[0].should.have.property('_id')
      response.body[0].should.have.property('user')
      response.body[0].user.should.equal('5a1e8b34261a720002687e06')
      response.body[0].should.have.property('date')
      response.body[0].should.have.property('items')
      response.body[0].items.should.be.an('array')
      response.body[0].should.have.property('totalPrice')
      done()
    })
  })

  it('should return transaction detail by transaction id', function (done) {
    chai.request(app)
    .get(`/transactions/detail/${newid}`)

    .end(function (err, response) {
      response.status.should.equal(200)
      response.body.should.have.property('_id')
      response.body._id.should.equal(newid)
      response.body.should.have.property('user')
      response.body.should.have.property('date')
      response.body.should.have.property('items')
      response.body.items.should.be.an('array')
      response.body.should.have.property('totalPrice')
      done()
    })
  })


  it('should edit transactions data by transaction id', function (done) {
    chai.request(app)
    .put(`/transactions/${newid}`)
    .send({
      totalPrice: 120000,
    })

    .end(function (err, response) {
      response.status.should.equal(200)
      response.body.should.be.an('object')
      response.body.message.should.equal('Update Success')
      done()
    })
  })

  it('should delete data transactions by transaction id',function(done){
  chai.request(app)
  .delete(`/transactions/${newid}`)

  .end(function(err,response){
    response.status.should.equal(200)
    response.body.should.be.an('object')
    response.body.message.should.equal('Delete Success')

    done()
  })
})




})
