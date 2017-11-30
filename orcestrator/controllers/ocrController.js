const axios = require('axios')

module.exports = {
  postOcr: (req, res) => {
    let imageUri = req.file.cloudStoragePublicUrl
    // console.log(imageUri);

    axios.post('https://us-central1-ian-hacktiv8.cloudfunctions.net/ocrGoogleVision', {imageUri})
    .then(({data}) => {
      res.send({
        data: data
      })
    }).catch((reason) => {
      console.log(reason);
    })
  }
}
