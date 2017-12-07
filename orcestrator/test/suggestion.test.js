var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var app = require('../app')

chai.use(chaiHttp)

let sampleValid = {
  "items":[
       {
         "name":"tali jemuran",
         "category":"Home Improvement/Hardware/Door Hardware/Door Hinges",
         "qty": 1,
         "price": 800000
       },
       {
         "name":"tali jemuran lux",
         "category":"Home Improvement/Hardware/Door Hardware/Door Hinges",
         "qty": 1,
         "price": 80
       },
       {
         "name":"sabun",
         "category":"Personal Care/Bath & Body/Body Wash & Cleansers",
         "qty": 1,
         "price": 20000
       },
       {
         "name":"sabun",
         "category":"Personal Care/Bath & Body/Body Wash & Cleansers",
         "qty": 1,
         "price": 20000
       }
     ],
     "priority":[
       "Food/Meal Solutions, Grains & Pasta/Grains & Rice",
       "Personal Care/Bath & Body/Body Wash & Cleansers",
       "Auto & Tires/Oils and Fluids/Motor Oil"
     ]
}

let sampleBlank = {
  "items":[],
  "priority":[]
}

let sampleNoItems = {
       "priority":[
       "Food/Meal Solutions, Grains & Pasta/Grains & Rice",
       "Personal Care/Bath & Body/Body Wash & Cleansers",
       "Auto & Tires/Oils and Fluids/Motor Oil"
     ]
}

let sampleNoPriority = {
  "items":[
       {
         "name":"tali jemuran",
         "category":"Home Improvement/Hardware/Door Hardware/Door Hinges",
         "qty": 1,
         "price": 800000
       },
       {
         "name":"tali jemuran lux",
         "category":"Home Improvement/Hardware/Door Hardware/Door Hinges",
         "qty": 1,
         "price": 80
       },
       {
         "name":"sabun",
         "category":"Personal Care/Bath & Body/Body Wash & Cleansers",
         "qty": 1,
         "price": 20000
       },
       {
         "name":"sabun",
         "category":"Personal Care/Bath & Body/Body Wash & Cleansers",
         "qty": 1,
         "price": 20000
       }
     ]
}

describe('Suggestion route', function(){
  it('should return suggestion if data valid', function (done) {
    chai.request(app)
    .post('/sugestion')
    .send(sampleValid)
    .end(function (err, response) {
      response.status.should.equal(200)
      response.body.should.be.an('object')
      response.body.should.have.property('done')
      response.body.should.have.property('need')
      response.body.should.have.property('suggest_keep')
      response.body.should.have.property('suggest_remove')
      done()
    })
  })

  it('should return suggestion item list still empty', function (done) {
    chai.request(app)
    .post('/sugestion')
    .send(sampleBlank)
    .end(function (err, response) {
      response.status.should.equal(200)
      response.body.should.be.an('object')
      response.body.should.have.property('done')
      response.body.should.have.property('need')
      response.body.should.have.property('suggest_keep')
      response.body.should.have.property('suggest_remove')
      done()
    })
  })

  it('should return suggestion priority list still empty', function (done) {
    chai.request(app)
    .post('/sugestion')
    .send(sampleBlank)
    .end(function (err, response) {
      response.status.should.equal(200)
      response.body.should.be.an('object')
      response.body.should.have.property('done')
      response.body.should.have.property('need')
      response.body.should.have.property('suggest_keep')
      response.body.should.have.property('suggest_remove')
      done()
    })
  })

  it('should error if data have no items', function (done) {
    chai.request(app)
    .post('/sugestion')
    .send(sampleNoItems)
    .end(function (err, response) {
      response.status.should.equal(400)
      done()
    })
  })

  it('should error if data have no priority', function (done) {
    chai.request(app)
    .post('/sugestion')
    .send(sampleNoPriority)
    .end(function (err, response) {
      response.status.should.equal(400)
      done()
    })
  })




})
