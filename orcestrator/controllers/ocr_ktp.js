// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');
var stringSimilarity = require('string-similarity');

const vision = new Vision.ImageAnnotatorClient({
  projectId: 'ian-hacktiv8',
  keyFilename: 'key.json'
});

// Prepare the request object

// Performs label detection on the image file

exports.ocrKtp = function ocrKtp(req, res) {
  const request = {
    image: {
      source: {
        imageUri: req.body.imageUri
      }
    },
    "imageContext": {
      "languageHints": [
        "id"
      ]
    }
  };
  vision.textDetection(request)
  .then((results) => {
    const detections = results[0].textAnnotations;
    var text = detections[0].description.split('\n')
    text = text.map(t => {
      return t.toUpperCase()
    })
    // get PROVINSI
    let provinsi = text[0].replace('PROVINSI', '')
    let kota = text[1].replace('KABUPATEN', '')
    provinsi = provinsi.replace(' ', '')
    kota = kota.replace('KOTA', '')
    kota = kota.replace(' ', '')
    // get nik
    function escapeRegExp(string){
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function replaceAll(str, term, replacement) {
      return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
    }

    // get nik
    var matches = stringSimilarity.findBestMatch('NIK', text);
    let indexNik = text.indexOf(matches.bestMatch.target)
    let nik = ''
    let tempNik = text[indexNik]
    if (tempNik.replace('NIK', '').length > 2) {
      nik = tempNik.replace('NIK', '')
    } else {
      nik = text[indexNik + 1]
    }
    nik = nik.replace(':', '')
    nik = nik.replace('b', '6')
    nik = replaceAll(nik, 'B', '8')
    nik = replaceAll(nik, 'l', '1')

    // get nama
    matches = stringSimilarity.findBestMatch('NAMA', text)
    let matchesTtl = stringSimilarity.findBestMatch('TEMPAT/TGL Lahir', text)
    let indexTtl = text.indexOf(matchesTtl.bestMatch.target)
    let nama = ''
    let indexNama = text.indexOf(matches.bestMatch.target)
    let tempNama = text[indexNama]
    if (tempNama.replace('NAMA', '').length > 2) {
      nama = tempNama.replace('NAMA', '')
    } else if (indexTtl - indexNama === 1) {
      nama = text[indexNama - 1]
    } else {
      nama = text[indexNama + 1]
      indexNama += 1
    }
    nama = nama.replace(':', '')

    // matches = stringSimilarity.findBestMatch('TEMPAT/TGL Lahir', text)

    if (indexTtl - indexNama > 1) {
      for (let i = 1; i < (indexTtl - indexNama); i++) {
        nama += ' ' + text[indexNama + i]
      }
    }

    let ttl = ''
    let tanggalLahir = ''
    let tempatLahir = ''

    let tempTtl = text[indexTtl]
    if (tempTtl.replace('TEMPAT', '').length > 11) {
      // berarti sebaris
      ttl = tempTtl.replace('TEMPAT', '')
    }
    else {
      ttl = text[indexTtl + 1]
    }

    let firstDigitTtl = ttl.match(/\d/)
    let indexFirstDigit = ttl.indexOf(firstDigitTtl)
    ttl = ttl.split('')
    tanggalLahir = ttl.slice()
    tanggalLahir.splice(0, indexFirstDigit)
    tanggalLahir = tanggalLahir.join('')
    tempatLahir = ttl.slice()
    tempatLahir.splice(indexFirstDigit, ttl.length)
    tempatLahir = tempatLahir.join('')
    if (tempatLahir.indexOf(':') > -1) {
      tempatLahir = tempatLahir.split('')
      tempatLahir = tempatLahir.splice(tempatLahir.indexOf(':') + 1, tempatLahir.length)
      tempatLahir = tempatLahir.join('')
    }
    if (tempatLahir.indexOf('LAHIR') > -1) {
      let index = tempatLahir.indexOf('LAHIR')
      tempatLahir = tempatLahir.split('')
      tempatLahir = tempatLahir.splice(index, tempatLahir.length)
      tempatLahir = tempatLahir.join('')
      tempatLahir = tempatLahir.replace('LAHIR', '')
    }
    tempatLahir = tempatLahir.replace(',', '')

    let jenisKelamin = ''
    let matchJKLaki = stringSimilarity.findBestMatch('LAKI-LAKI', text)
    let matchJKPerempuan = stringSimilarity.findBestMatch('PEREMPUAN', text)

    if (matchJKLaki.bestMatch.rating > matchJKPerempuan.bestMatch.rating) {
      jenisKelamin = 'LAKI-LAKI'
    } else {
      jenisKelamin = 'PEREMPUAN'
    }

    let agama = ''

    let matchKristen = stringSimilarity.findBestMatch('KRISTEN', text)
    let matchKatholik = stringSimilarity.findBestMatch('KATHOLIK', text)
    let matchIslam = stringSimilarity.findBestMatch('ISLAM', text)
    let matchBudha = stringSimilarity.findBestMatch('BUDHA', text)
    let matchHindu = stringSimilarity.findBestMatch('HINDU', text)
    let highest = 0

    if (matchKristen.bestMatch.rating > highest) {
      agama = 'KRISTEN'
      highest = matchKristen.bestMatch.rating
    }
    if (matchKatholik.bestMatch.rating > highest) {
      agama = 'KATHOLIK'
      highest = matchKatholik.bestMatch.rating
    }
    if (matchIslam.bestMatch.rating > highest) {
      agama = 'ISLAM'
      highest = matchIslam.bestMatch.rating
    }
    if (matchBudha.bestMatch.rating > highest) {
      agama = 'BUDHA'
      highest = matchBudha.bestMatch.rating
    }
    if (matchHindu.bestMatch.rating > highest) {
      agama = 'HINDU'
      highest = matchHindu.bestMatch.rating
    }

    let status = ''

    let matchKawin = stringSimilarity.findBestMatch('KAWIN', text)
    let matchBelumKawin = stringSimilarity.findBestMatch('BELUM', text)
    if (matchKawin.bestMatch.rating > matchBelumKawin.bestMatch.rating) {
      status = 'KAWIN'
    } else {
      status = 'BELUM KAWIN'
    }

    let kewarganegaraan = ''
    let matchWNI = stringSimilarity.findBestMatch('WNI', text)
    let matchWNA = stringSimilarity.findBestMatch('WNA', text)
    if (matchWNA.bestMatch.rating > matchWNI.bestMatch.rating) {
      kewarganegaraan = 'WNA'
    } else {
      kewarganegaraan = 'WNI'
    }

    var object = {
      provinsi,
      kota,
      nik,
      nama,
      jenisKelamin,
      agama,
      status,
      tanggalLahir,
      tempatLahir,
      kewarganegaraan
      // pekerjaan
    }
    res.status(200).json({text, object})
  })
  .catch((err) => {
    res.status(400).send({
      status: 'Failed',
      err: 'Please try a better focused image'
    })
    // console.error('ERROR:', err);
  });
};
