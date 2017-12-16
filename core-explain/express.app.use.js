app.use = function use(fn) {
    var offset = 0;
    var path = '/';

    // default path to '/'
    // disambiguate app.use([fn])
    // '/'作为默认路径 当app.use不传路径时使用
    if (typeof fn !== 'function') {
        var arg = fn;

        while (Array.isArray(arg) && arg.length !== 0) {
            arg = arg[0];
        }

        // first arg is the path
        // 第一个参数为路径，则重设path
        if (typeof arg !== 'function') {
            offset = 1;
            path = fn;
        }
    }
    // 将嵌套数组解析成一维数组
    // 从这里看出 offset 其实是用来标记从第几个参数开始为中间件函数
    var fns = flatten(slice.call(arguments, offset));

    if (fns.length === 0) {
        throw new TypeError('app.use() requires a middleware function')
    }

    // 创建并加载一个router对象
    // setup router
    this.lazyrouter();
    var router = this._router;

    //注册所有中间件函数
    fns.forEach(function (fn) {
        // non-express app
        if (!fn || !fn.handle || !fn.set) {
            return router.use(path, fn);
        }

        debug('.use app under %s', path);
        fn.mountpath = path;
        fn.parent = this;

        // restore .app property on req and res
        router.use(path, function mounted_app(req, res, next) {
            var orig = req.app;
            fn.handle(req, res, function (err) {
                setPrototypeOf(req, orig.request)
                setPrototypeOf(res, orig.response)
                next(err);
            });
        });

        // mounted an app
        fn.emit('mount', this);
    }, this);

    return this;
};