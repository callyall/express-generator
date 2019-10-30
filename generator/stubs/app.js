const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()
const getRawBody = require('raw-body')
const zlib = require('zlib')
const BSON = require('bson')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/octet-stream') {
    getRawBody(req).then(body => {
      zlib.inflateRaw(body, (e, b) => {
        if (e === null) {
          try {
            req.body = BSON.deserialize(b)
          } catch (e) {
            next(e)
          }
        }
        next(e)
      })
    }).catch(next)
  } else {
    next()
  }
})

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get(/^((?!api).)*$/, (req, res) => {
  res.send('not api!')
})

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.log(err)
  res.send('Something went wrong!')
})

module.exports = app
