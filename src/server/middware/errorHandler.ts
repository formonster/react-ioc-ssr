import logger from "../utils/logger";
import { resError } from "../utils/response";
import Router from "@koa/router";

const errorHandler = async (ctx: Router.RouterContext, next: () => Promise<unknown>) => {
    try {
        await next();

        // 404 处理
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = "404";
        }
    } catch (error) {
        // 错误处理
        logger.error(error);
        ctx.status = error.status || 500;
        ctx.body = resError(error.toString());
    }
};
export default errorHandler;
