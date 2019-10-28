const express = require('express')
const cors = require('cors')

require('./db/mongoose')
const userRouter = require('./routers/user')
const profileRouter = require('./routers/profile')
const postRouter = require('./routers/post')
const therapistRouter = require('./routers/therapist')
const feedbackRouter = require('./routers/feedback')


const app = express()
app.use(cors())
app.options('*', cors())
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
const port = process.env.PORT || 4000

app.use(express.json())
app.use(userRouter)
app.use(profileRouter)
app.use(postRouter)
app.use(therapistRouter)
app.use(feedbackRouter)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})

