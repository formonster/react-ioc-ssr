// 解决 TS 别名在 React 项目中加载失败的问题
import 'module-alias/register'
import Koa from "koa";
import range from 'koa-range';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static-cache';
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";

// 中间件
import beaconHandler from "./middware/beaconHandler";
import errorHandler from "./middware/errorHandler";
import domainHandler from "./middware/domainHandler";

import config from "../config";
import logger from "./utils/logger";

const app = new Koa();

// 解决视频资源无法切换播放时间问题
app.use(range);
app.use(bodyParser());
// 配置中间件-静态资源配置
app.use(serve(config.staticDir, {
    // maxAge: 365 * 24 * 60 * 60,
    // gzip: true,
    // preload: false,
    // dynamic: true,
}));
app.use(serve(config.buildDir, {
    // maxAge: 365 * 24 * 60 * 60,
    // gzip: true,
    // preload: false,
    // dynamic: true,
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
app.use(beaconHandler);
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