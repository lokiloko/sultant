var mongoose = require('mongoose');
require('dotenv').config()
var Schema = mongoose.Schema
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
// mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@sultant-shard-00-00-vwvs0.mongodb.net:27017,sultant-shard-00-01-vwvs0.mongodb.net:27017,sultant-shard-00-02-vwvs0.mongodb.net:27017/test?ssl=true&replicaSet=Sultant-shard-0&authSource=admin');
mongoose.connection.openUri('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@sultant-shard-00-00-vwvs0.mongodb.net:27017,sultant-shard-00-01-vwvs0.mongodb.net:27017,sultant-shard-00-02-vwvs0.mongodb.net:27017/test?ssl=true&replicaSet=Sultant-shard-0&authSource=admin')
mongoose.Promise = global.Promise;
var userSchema = new Schema({
  nik: {
    type: String,
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  jenisKelamin: {
    type: String,
    required: true
  },
  provinsi: {
    type: String,
    required: true
  },
  kota: {
    type: String,
    required: true
  },
  agama: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  tanggalLahir: {
    type: String,
    required: true
  },
  tempatLahir: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', userSchema);

class Model {
  // static login (email, password) {
  //   return new Promise((resolve, reject) => {
  //     User.findOne({
  //       "email": email,
  //     }).then((data) => {
  //       const secret = process.env.SALT_KEY;
  //       const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
  //       if (hash === data.password) {
  //         var token = jwt.sign({
  //           _id: data._id,
  //           name: data.name,
  //           email: data.email
  //         }, process.env.JWT_KEY);
  //         resolve({
  //           status: 'Login Success',
  //           token: token
  //         });
  //       } else {
  //         reject('gagal')
  //       }
  //     }).catch((err) => {
  //       reject(err)
  //     })
  //   })
  // }
  static readAll() {
    return new Promise((resolve, reject) => {
      User.find({}).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject) => {
      User.findOne({"_id": id })
      .then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static create(insert) {
    return new Promise((resolve, reject) => {
      User.create({
        nik: insert.nik,
        nama: insert.nama,
        jenisKelamin: insert.jenisKelamin,
        provinsi: insert.provinsi,
        kota: insert.kota,
        agama: insert.agama,
        status: insert.status,
        tanggalLahir: insert.tanggalLahir,
        tempatLahir: insert.tempatLahir
      }).then((data) => {
        var obj = {
          message: 'Insert Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static update(id, update){
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({"_id":id},update, {new:true}).then((data) => {
        var obj = {
          message: 'Update Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static delete(id){
    return new Promise((resolve, reject) => {
      User.findOneAndRemove({
        "_id":id
      }).then((data) => {
        var obj = {
          message: 'Delete Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = Model;
