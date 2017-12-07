const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

const app = require('../app')


describe('OCR Price tag route', function() {
  it('Should return price and name if image valid', function(done) {
    chai.request(app)
    .post('/ocr_pricetag')
    .send({imageUri:'http://blog-tdd.lokilokostudio.tk.storage.googleapis.com/c029752a-d77a-4936-8c3c-bb529d861307.jpg'})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.should.have.property('name')
      res.body.object.should.have.property('price')
      res.body.object.should.have.property('category')
      done()
    })
  })

  it('Should return price and name if image valid different location', function(done) {
    chai.request(app)
    .post('/ocr_pricetag')
    .send({imageUri:'http://blog-tdd.lokilokostudio.tk.storage.googleapis.com/4c26899c-f561-4a1e-b077-e03f4f6b1ae6.jpg'})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.should.have.property('name')
      res.body.object.should.have.property('price')
      res.body.object.should.have.property('category')
      done()
    })
  })

  it('Should return error if image not valid', function(done) {
    chai.request(app)
    .post('/ocr_pricetag')
    .send({imageUri:'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjCncnm-uvXAhUHi5QKHZbyAXQQjRwIBw&url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.vertumus.dives&psig=AOvVaw2gCcrThx0FU9YbJe87jsm6&ust=1512325801721147'})
    .end((err, res) => {
      res.status.should.equal(400)
      done()
    })
  })

})
