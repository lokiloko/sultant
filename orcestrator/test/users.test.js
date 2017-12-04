const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)

var postedId = ''

var dummyDataUser = {
  nik: '123',
  nama: 'John',
  jenisKelamin: 'Laki laki',
  provinsi: 'JAWA BARAT',
  kota: 'JAKARTA',
  agama: '---',
  status: 'BELUM NIKAH',
  tanggalLahir: '30 FEBRUARI 1999',
  tempatLahir: 'JAKARTA'

}

describe('Users route', function() {
  it('Should get all user data', function(done) {
    chai.request(app)
    .get('/users')
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('array')
      // res.body.message.should.equal("Tampil Semua User")
      // res.body.data.should.be.an('array')
      // res.body.data.should.have.lengthOf.above(0)
      done()
    })
  })

  it('Should get users data object', function(done) {
    chai.request(app)
    .get('/users')
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('array')
      res.body[0].should.have.property('_id')
      res.body[0]._id.should.be.a('string')

      done()
    })
  })
  //
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
      res.body.data.should.have.property('_id')
      res.body.data._id.should.be.a('string')
      res.body.data.should.have.property('nama')
      res.body.data.nama.should.be.a('string')
      res.body.data.should.have.property('jenisKelamin')
      res.body.data.jenisKelamin.should.be.a('string')
      res.body.data.should.have.property('provinsi')
      res.body.data.provinsi.should.be.a('string')
      postedId = res.body.data._id
      done()
    })
  })

  it('Should get detail user data', function(done) {
    chai.request(app)
    .get(`/users/${postedId}`)
    .end((err, res) => {
      res.status.should.equal(200)
      // res.body.should.be.an('object')
      done()
    })
  })


  it('Should error when id not found for detail', function(done) {
    chai.request(app)
    .get(`/users/111`)
    .end((err, res) => {
      res.status.should.equal(400)
      // res.body.should.be.an('object')
      done()
    })
  })




  it('Should return error when nama isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '123',
      nama: '',
      jenisKelamin: 'Laki laki',
      provinsi: 'JAWA BARAT',
      kota: 'JAKARTA',
      agama: '---',
      status: 'BELUM NIKAH',
      tanggalLahir: '30 FEBRUARI 1999',
      tempatLahir: 'JAKARTA'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when nik isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '',
      nama: 'John',
      jenisKelamin: 'Laki laki',
      provinsi: 'JAWA BARAT',
      kota: 'JAKARTA',
      agama: '---',
      status: 'BELUM NIKAH',
      tanggalLahir: '30 FEBRUARI 1999',
      tempatLahir: 'JAKARTA'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when gender isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '123',
      nama: 'John',
      jenisKelamin: '',
      provinsi: 'JAWA BARAT',
      kota: 'JAKARTA',
      agama: '---',
      status: 'BELUM NIKAH',
      tanggalLahir: '30 FEBRUARI 1999',
      tempatLahir: 'JAKARTA'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when province isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '123',
      nama: 'John',
      jenisKelamin: 'Laki laki',
      provinsi: '',
      kota: 'JAKARTA',
      agama: '---',
      status: 'BELUM NIKAH',
      tanggalLahir: '30 FEBRUARI 1999',
      tempatLahir: 'JAKARTA'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when city isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '123',
      nama: 'John',
      jenisKelamin: 'Laki laki',
      provinsi: 'JAWA BARAT',
      kota: '',
      agama: '---',
      status: 'BELUM NIKAH',
      tanggalLahir: '30 FEBRUARI 1999',
      tempatLahir: 'JAKARTA'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when religion isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '123',
      nama: 'John',
      jenisKelamin: 'Laki laki',
      provinsi: 'JAWA BARAT',
      kota: 'JAKARTA',
      agama: '',
      status: 'BELUM NIKAH',
      tanggalLahir: '30 FEBRUARI 1999',
      tempatLahir: 'JAKARTA'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when status isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '123',
      nama: 'John',
      jenisKelamin: 'Laki laki',
      provinsi: 'JAWA BARAT',
      kota: 'JAKARTA',
      agama: '---',
      status: '',
      tanggalLahir: '30 FEBRUARI 1999',
      tempatLahir: 'JAKARTA'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when birthdate isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '123',
      nama: 'John',
      jenisKelamin: 'Laki laki',
      provinsi: 'JAWA BARAT',
      kota: 'JAKARTA',
      agama: '---',
      status: 'BELUM NIKAH',
      tanggalLahir: '',
      tempatLahir: 'JAKARTA'
    })
    .end((err, res) => {
      // console.log(res.status);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return error when birthplace isEmpty', function(done) {
    chai.request(app)
    .post('/users')
    .send({
      nik: '123',
      nama: 'John',
      jenisKelamin: 'Laki laki',
      provinsi: 'JAWA BARAT',
      kota: 'JAKARTA',
      agama: '---',
      status: 'BELUM NIKAH',
      tanggalLahir: '30 FEBRUARI 1999',
      tempatLahir: ''
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
      nama: 'Jane',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.nama.should.equal('Jane')
      done()
    })
  })
  //
  it('Should return updated user gender when only gender is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      jenisKelamin: 'Perempuan',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.jenisKelamin.should.equal('Perempuan')
      done()
    })
  })

  it('Should return updated user provinsi when only provinsi is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      provinsi: 'medan',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.provinsi.should.equal('medan')
      done()
    })
  })

  it('Should return updated user city when only city is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      kota: 'medan',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.kota.should.equal('medan')
      done()
    })
  })

  it('Should return updated user religion when only religion is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      agama: 'TOBAT',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.agama.should.equal('TOBAT')
      done()
    })
  })

  it('Should return updated user status when only status is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      status: 'NIKAH',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.status.should.equal('NIKAH')
      done()
    })
  })

  it('Should return updated user birtdate when only birtdate is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      tanggalLahir: '29 FEBRUARI 2000',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.tanggalLahir.should.equal('29 FEBRUARI 2000')
      done()
    })
  })

  it('Should return error when update id not found', function(done) {
    chai.request(app)
    .put(`/users/111`)
    .send({
      tempatLahir: 'PADANG',
    })
    .end((err, res) => {
      res.status.should.equal(400)
      done()
    })
  })

  it('Should return updated user birth place when only birth place is updated', function(done) {
    chai.request(app)
    .put(`/users/${postedId}`)
    .send({
      tempatLahir: 'PADANG',
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.be.a('string')
      res.body.message.should.equal("Update Success")
      res.body.data.should.be.an('object')
      res.body.data.tempatLahir.should.equal('PADANG')
      done()
    })
  })

  it('Should error when delete userid not found', function(done) {
    chai.request(app)
    .delete(`/users/111`)
    .end((err, res) => {
      res.status.should.equal(400)
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
