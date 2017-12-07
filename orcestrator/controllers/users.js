const model = require('../models/users')

class controller {

  static findAll(req,res){
    model.readAll().then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(400).send(err)
    })
  }

  static findDetail(req,res){
    model.readOne(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(400).send(err)
    })
  }


  static insert(req,res){
    model.create(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(400).send(err)
    })
  }

  static delete(req,res){
    model.delete(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(400).send(err)
    })
  }

  static update(req,res){
    model.update(req.params.id, req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(400).send(err)
    })
  }

}


// exports.usersCRUD = function usersCRUD(req, res) {
//   switch(req.method) {
//     case "GET":
//       if (req.query.id) {
//         model.readOne(req.query.id).then((data) => {
//           res.status(200).send(data)
//         }).catch(err => {
//           res.status(400).send(err)
//         })
//       } else {
//         model.readAll().then((data) => {
//           res.status(200).send(data)
//         }).catch(err => {
//           res.status(400).send(err)
//         })
//       }
//       break;
//     case "POST":
//       if (req.query.action === 'login') {
//         model.login(req.body.email, req.body.password).then((data)=>{
//           res.status(200).send(data)
//         }).catch((err)=>{
//           res.status(400).send(err)
//         })
//       } else {
//         model.create(req.body).then((data) => {
//           res.status(200).send(data)
//         }).catch((err) => {
//           res.status(400).send(err)
//         })
//       }
//       break;
//     case "DELETE":
//       model.delete(req.query.id).then((data) => {
//         res.status(200).send(data)
//       }).catch((err) => {
//         res.status(400).send(err)
//       })
//       break;
//     case "PUT":
//       model.update(req.query.id, req.body).then((data) => {
//         res.status(200).send(data)
//       }).catch((err) => {
//         res.status(400).send(err)
//       })
//       break;
//     default:
//       res.send({
//         status: "Not Found"
//       })
//   }
// };

module.exports = controller;
