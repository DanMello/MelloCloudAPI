// convert -density 150 CSS.pdf[5] -quality 90 output-%d.png
// identify -format %n image.pdf
// let orginalFile = path + '/public/pdf/' + req.params.file
// let newFile = path + '/public/pdf/' + 'output-%d.png'

exports.convertPdftoImage = function (req, res, next) {

  const path = require('path');
  const homePath = path.resolve('.');
  const { spawn } = require('child_process');

  const countPages = spawn('qpdf', [
    '--show-npages',
    orginalFile
  ])
  
  countPages.stdout.on('data', (data) => {

    const numberOfPages = parseInt(data, 10)
    const fileName = path.parse(req.params.file).name
    const orginalFile = path + '/public/pdf/' + req.params.file
    const newFile = path + '/public/pdf/' + fileName + '-%d.png'

    const command = spawn('convert', [
      '-density',
      '150',
      orginalFile,
      '-quality',
      '90',
      newFile
    ])

    command.stdout.on('data', (data) => {

      console.log(data)
    });
    
  });

  countPages.stderr.on('data', (data) => {
    console.error(`countPages stderr:\n${data}`);
  });

  // const command = spawn('convert', [
  //   '-density',
  //   '150',
  //   orginalFile,
  //   '-quality',
  //   '90',
  //   newFile
  // ])

  // console.log(req.params.file) 
}