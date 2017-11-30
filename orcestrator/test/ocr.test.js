const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const fs = require('fs')

const app = require('../app')
const { uploadFile } = require('../helpers/images')

chai.use(chaiHttp)

let boundary = Math.random()
let fileName = "labeltest.jpeg"
let assert = chai.assert

describe('OCR route', function() {
  it('Should return object description when image link post is correct', function(done) {
    chai.request(app)
    .post('/ocr')
    .attach('image', fs.readFileSync(`./public/${fileName}`), fileName)
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.productName.should.be.a('string')
      res.body.productName.should.have.lengthOf.above(0)
      res.body.price.should.be.a('string')
      res.body.price.should.have.lengthOf.above(0)
      done()
    })
  })
})
