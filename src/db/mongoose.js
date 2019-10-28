const mongoose = require('mongoose')

const connectionURL = 'mongodb://root:root123@ds237588.mlab.com:37588/therappy'
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
