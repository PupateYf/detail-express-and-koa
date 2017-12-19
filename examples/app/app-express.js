const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.send('Hey guys -express')
})

//处理错误
app.use((err,req,res,next) => {
    // handle error here
})


var server = app.listen(3333)