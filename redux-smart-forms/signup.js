exports.init = function (req, res, next) {
  
    console.log(req.body)

    // return res.status(400).send('Form error')

    // return res.send('Success please return to home page')

    return res.json({
      ...req.body,
      token: 'jsklajdl2jsa90fhj' 
    })
}