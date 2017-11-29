const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)


// describe('App', () => {
//   it('Should log connected', (done) => {
//     chai.request(app)
//     .get('users/')
//   })
// })
