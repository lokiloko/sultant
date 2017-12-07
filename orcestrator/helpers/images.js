'use strict'
// require('dotenv').config()
const Multer = require('multer')
const Storage = require('@google-cloud/storage')
const storage = Storage({
  projectId: "api-project-721451771393" ,
  keyFilename: "keyFile.json"
})

const bucket = storage.bucket("sultantscan")

function getUrl(filename) {
  return 'https://storage.googleapis.com/sultantscan/'+filename
}

function uploadFile(req, res, next) {
  if (!req.file) {
    return next()
  }

  let gcsname = new Date() + "-" + req.file.originalname
  // const file = bucket.file('/products/'+gcsname) // belajaran
  let file = bucket.file(gcsname)

  let stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

let multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

module.exports = {
  getUrl,
  uploadFile,
  multer
}
