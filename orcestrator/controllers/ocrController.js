const axios = require('axios')

module.exports = {
  postOcr: (req, res) => {
    let imageUri = req.file.cloudStoragePublicUrl

    axios.post('https://us-central1-ian-hacktiv8.cloudfunctions.net/ocrGoogleVision', {imageUri})
    .then(({data}) => {
      res.status(200).json({
        productName: data[0],
        price: data[1]
      })
    }).catch(({response}) => {
      res.status(400).json({
        message: response.data
      })
    })
  }
}
