const uri = "https://us-central1-ian-hacktiv8.cloudfunctions.net/transactionsCRUD"
const axios = require('axios')

module.exports = {
  findAll: (req,res)=>{
    axios.get(uri)
    .then(({data})=>{
      res.status(200).json(data)
    }).catch(({response})=>{
      res.status(400).json(response.data)
    })
  },

  findByUser: (req,res)=>{
    axios.get(`${uri}/?action=user&id=${req.params.userId}`)
    .then(({data})=>{
      res.status(200).json(data)
    }).catch(({response})=>{
      // console.log(response.data);
      res.status(400).json(response.data)
    })
  },

  findDetail: (req,res)=>{
    axios.get(`${uri}/?id=${req.params.transactionId}`)
    .then(({data})=>{
      res.status(200).json(data)
    }).catch(({response})=>{
      res.status(400).json(response.data)
    })
  },

  changeData: (req,res)=>{
    axios.put(`${uri}/?id=${req.params.transactionId}`,req.params.body)
    .then(({data})=>{
      res.status(200).json(data)
    }).catch(({response})=>{
      res.status(400).json(response.data)
    })
  },

  deleteData: (req,res)=>{
    axios.delete(`${uri}/?id=${req.params.transactionId}`)
    .then(({data})=>{
      res.status(200).json(data)
    }).catch(({response})=>{
      res.status(400).json(response.data)
    })
  },

  addData: (req,res)=>{
    axios.post(uri,req.body)
    .then(({data})=>{
      res.status(200).json(data)
    }).catch(({response})=>{
      res.status(400).json(response.data)
    })
  },
}
