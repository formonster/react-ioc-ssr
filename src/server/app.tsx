import Koa from "koa";
import range from 'koa-range';
import serve from 'koa-static-cache';
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import errorHandler from "./middware/errorHandler";
import domainHandler from "./middware/domainHandler";

import config from "../../config";
import logger from "./utils/logger";

const app = new Koa();

// 解决视频资源无法切换播放时间问题
app.use(range);
// 配置中间件-静态资源配置
app.use(serve(config.buildDir));
app.use(serve(config.staticDir, {
    gzip: true,
}));

// 创建一个基础容器，负责装载服务
const container = createContainer();
// 加载 Service 模块
container.loadModules([`${__dirname}/service/*.ts`], {
    // 定义命名方式：驼峰形式
    formatName: "camelCase",
    resolverOptions: {
        // 每次调用都创建新都实例
        lifetime: Lifetime.SCOPED
    }
})

// 注入 container
app.use(scopePerRequest(container));
app.use(errorHandler);
// 跨域请求处理
app.use(domainHandler);
// 加载路由
app.use(loadControllers(`${__dirname}/routers/*.tsx`));
app.use(loadControllers(`${__dirname}/routers/*.ts`));


app.listen(config.port, function () {
    logger.debug(`🚀 starting http://localhost:${config.port}`);
    console.log(`🚀 starting http://localhost:${config.port}`);
})