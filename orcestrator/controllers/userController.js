const uri = "https://us-central1-ian-hacktiv8.cloudfunctions.net/usersCRUD"
const axios = require('axios')

module.exports = {
  findAll: (req, res) => {
    axios.get(uri).then(({data}) => {
      // console.log(data)
      if (data.length !== 0) {
        res.status(200).json({
          message: "Tampil Semua User",
          data: data
        })
      } else {
        res.status(400).json({
          message: "Users data tidak ditemukan"
        })
      }
    }).catch(({response}) => {
      res.status(400).json({
        message: response.data
      })
    })
  },

  insert: (req, res) => {
    axios.post(uri, req.body).then(({data}) => {
      // console.log(data);
      res.status(200).json({
        message: "Insert Success",
        data: data
      })
    }).catch(({response}) => {
      // console.log(response.data.errors);
      res.status(400).send({
        message: response.data.errors
      })
    })
  },

  login: (req, res) => {
    axios.post(`${uri}?action=login`, req.body).then(({data}) => {
      // console.log(data)
      res.status(200).json({
        message: "Login Success",
        token: data.token
      })
    }).catch(({response}) => {
      // console.log(response.data);
      res.status(400).json({
        message: response.data
      })
    })
  },

  update: (req, res) => {
    // console.log("params --- ", req.body);
    axios.put(`${uri}?id=${req.params.id}`, req.body)
    .then(({data}) => {
      // console.log("hai");
      res.status(200).json({
        message: "Update Success",
        data: data.data
      })
    }).catch(({response}) => {
      // console.log(response);
      res.status(400).json({
        message: response.data
      })
    })
  },

  delete: (req, res) => {
    axios.delete(`${uri}?id=${req.params.id}`)
    .then(({data}) => {
      // console.log(data);
      res.status(200).json({
        message: "Delete Success",
        data: data.data
      })
    }).catch(({response}) => {
      res.status(400).json({
        message: response.data
      })
    })
  }
}
