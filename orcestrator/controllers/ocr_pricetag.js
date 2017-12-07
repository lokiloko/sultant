require('dotenv').config()
// Imports the Google Cloud client library
var stringSimilarity = require('string-similarity');
const Vision = require('@google-cloud/vision');
var axios = require('axios')

const vision = new Vision.ImageAnnotatorClient({
  projectId: 'ian-hacktiv8',
  keyFilename: 'key.json'
});

// The name of the image file to annotate
const fileName = './sample.jpg';

// Prepare the request object

// Performs label detection on the image file

exports.ocrGoogleVision = function ocrGoogleVision(req, res) {
  const request = {
    image: {
      source: {
        imageUri: req.body.imageUri
      }
    },
    imageContext: {
      languageHints: [
        "id"
      ]
    }
  };
  vision.textDetection(request)
  .then((results) => {
    const detections = results[0].textAnnotations;
    let text = detections[0].description.split('\n')
    text = text.map(t => {
      return t.toUpperCase()
    })
    let matches = stringSimilarity.findBestMatch('RP', text)
    let indexPrice = text.indexOf(matches.bestMatch.target)
    let indexName = 0
    if (indexPrice === 0) {
      indexName = 1
    }
    let price = text[indexPrice].toLowerCase().replace('rp', '')
    price = price.replace('.', '')
    price = price.replace(' ', '')
    axios.get('http://api.walmartlabs.com/v1/search?apiKey=kjwevb9rz89krpne69p422gs&query='+text[indexName]).then((axiosResponse) => {
      // console.log(axiosResponse)
      let category = axiosResponse.data.items[0].categoryPath
      let object = {
        name: text[indexName],
        price,
        category
      }
      res.status(200).json({text, object})
    })
    // detections.forEach((text) => console.log(text.description));
  })
  .catch((err) => {
    res.status(400).send({
      status: 'Failed',
      err: JSON.stringify(err)
    })
  });
};
