const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    res.send('Hey guys -express')
})

//托管静态资源


var server = app.listen(3333)