const messages = {
  500: 'Something went wrong!',
  404: 'Not found!'
}

module.exports.send = (res, status, error) => {
  console.log(error)
  res.status(status).send(messages[status])
}
