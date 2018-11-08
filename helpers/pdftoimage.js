
const { spawn } = require('child_process')
const path = require('path')
const rootPath = path.resolve('../')
const fs = require('fs')

const countPages = (pdf) => {

  const command = spawn('qpdf', [
    '--show-npages',
    rootPath + '/public/pdf/' + pdf
  ])

  return new Promise((resolve, reject) => {

    command.stdout.on('data', (data) => {

      const numberOfPages = parseInt(data, 10)

      resolve(numberOfPages)
    })

    command.stderr.on('data', (data) => {

      reject(data)
    })
  })
}

const getPdfImagePaths = (file, numberOfPages) => {
  
  let imagePathsArray = []

  for (var i = 0; i < numberOfPages; i++) {

    let pdfImagePath = `/pdfimages/${file}-${i}.png`

    imagePathsArray.push(pdfImagePath)
  }

  return imagePathsArray
}

fs.readdir(rootPath + '/public/pdf/', (err, files) => {

  files.filter(x => x.includes('.pdf')).reduce(async (obj, pdf) => {
    
    const collection = await obj
    const pdfPages = await countPages(pdf)
    const key = path.parse(pdf).name
    const pdfImagePaths = getPdfImagePaths(key, pdfPages)
    const thumbnailPath = `/pdfpreviews/${key}.png`

    collection[pdf] = {
      thumbnailPath: thumbnailPath,
      pages: pdfPages,
      pdfImages: pdfImagePaths
    }

    return collection

  }, Promise.resolve({})).then(results => {

    return JSON.stringify(results, null, 2)

  }).then(jsonData => {

    fs.writeFileSync('pdfInfo.json', jsonData)

  }).catch(err => {

    console.log(err)
  })
})
