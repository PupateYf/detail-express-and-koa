# detail-express-and-koa
Detail of express and koa, especially the theory of midware and the difference between them.

## Middleware
#### express
对于一个express应用，本质上就是在调用各种中间件。中间件功能包括：
- 执行任意代码
- 修改请求对象(req)和响应(res)对象
- 结束请求并作出响应
- 调用下一个中间件(next)

中间件挂在方式：
- `app.use`, 注意：不挂载路径所有请求都会经过该中间件
- `app.METHOD`, 如`app.get`,`app.post`等指定处理特定http method的中间件

关于next
- `next()`表示将控制权交给栈中下一个中间件
- `next('route')`表示跳到下一个路由

`next('route')` 只对使用 `router.VERB()` 或 `app.VERB()`加载的中间件有效, 对`app.use`和`router.use`无效


