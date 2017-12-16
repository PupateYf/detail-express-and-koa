const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hey guys -koa'
})

//托管静态资源


app.listen(3333)