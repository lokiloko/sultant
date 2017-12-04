const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

const app = require('../app')

const imageUriE = 'https://dl.dropboxusercontent.com/apitl/1/AADU8nkqo39TrN5vhfQhMwa3P6ZlyrlIj8t7E7m7UiMxvJ6yeGhu7VVkhOlWHBSiQkj8EWlQ2Z_te1K8aDHmJBxc7ekN4ncTBBq4h2eoKhK9fq2IqDp17sunanZadBnHllBJrfxBDpsYozR8pZq5CP95Bi0cyDApTC1rgY-66aBHVM-Mzw3HvAlRrJEi9Yb4198RRyXFSeg27yVOS25oBexPGO6qrPNki30_IFNEaLhO0goeGsC5-6Yak2FEzqbZiZzTqO2XjTS6mZ28nNwjREL1mKPsU99LLuIkkEdFpgZ5gA'
const imageUri2 = 'http://iklanbarisnew.com/wp-content/uploads/2015/11/JASAKTP.jpg'
const imageUri3 = 'https://www.lapor.go.id/images/stream/17e9c4fecd71dd74128a4cabb489f59e.jpg'
const imageUri4 ='http://2.bp.blogspot.com/-GTSStTvLYxs/VfuyCOcpZaI/AAAAAAAAACc/5AB5EUm4Pr4/s1600/febry.jpg'
const imageUri5 ='https://www.lapor.go.id/images/stream/b292cde4f33372ef429c461ddf14270a.jpg'
const imageUri1 = 'http://blog-tdd.lokilokostudio.tk.storage.googleapis.com/090a4cdd-80ca-4b73-95ed-5db204235ec1.jpg'
const imageF = 'https://sarikurnia980.files.wordpress.com/2015/10/scan-ktp.jpg'

const imageRotate = 'https://pictestme.storage.googleapis.com/Screenshot from 2017-12-04 14-09-10.png'

describe('OCR KTP route', function() {
  it('Should return if image valid case 1', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageUri1})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.should.have.property('provinsi')
      res.body.object.should.have.property('kota')
      res.body.object.should.have.property('nik')
      res.body.object.should.have.property('nama')
      res.body.object.should.have.property('jenisKelamin')
      res.body.object.should.have.property('agama')
      res.body.object.should.have.property('status')
      res.body.object.should.have.property('tanggalLahir')
      res.body.object.should.have.property('tempatLahir')
      res.body.object.should.have.property('kewarganegaraan')
      done()
    })
  })

  it('Should return if image valid case 2', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageRotate})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.should.have.property('provinsi')
      res.body.object.should.have.property('kota')
      res.body.object.should.have.property('nik')
      done()
    })
  })

  it('Should return gender LAKI-LAKI', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageUri3})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.should.have.property('provinsi')
      res.body.object.should.have.property('kota')
      res.body.object.should.have.property('nik')
      res.body.object.jenisKelamin.should.equal('LAKI-LAKI')

      done()
    })
  })

  it('Should return gender PEREMPUAN', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageF})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.should.have.property('provinsi')
      res.body.object.should.have.property('kota')
      res.body.object.should.have.property('nik')
      res.body.object.jenisKelamin.should.equal('PEREMPUAN')
      done()
    })
  })

  it('Should return religion 1', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageUri5})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.agama.should.equal('BUDHA')
      done()
    })
  })

  it('Should return religion 2', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageUri1})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.agama.should.equal('ISLAM')
      // console.log(res.body.object.agama);
      done()
    })
  })

  it('Should return religion 3', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageUri4})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.agama.should.equal('HINDU')
      // console.log(res.body.object.agama);
      done()
    })
  })

  it('Should return religion 4', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageUri3})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.agama.should.equal('KRISTEN')
      // console.log(res.body.object.agama);
      done()
    })
  })

  it('Should return religion 5', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageUri3})
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.should.have.property('object')
      res.body.object.agama.should.equal('KRISTEN')
      // console.log(res.body.object.agama);
      done()
    })
  })

  it('Should err if image not valid', function(done) {
    chai.request(app)
    .post('/ocr_ktp')
    .send({imageUri:imageUriE})
    .end((err, res) => {
      res.status.should.equal(400)
      done()
    })
  })
})
