const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hey guys -koa'
})

//处理错误
app.on('error', (ctx, next) => {
  //handle error here
})

app.listen(3333)