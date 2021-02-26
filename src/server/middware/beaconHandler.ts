import Router from "@koa/router";
import coBody from 'co-body'
import { isNullObject } from '@/utils/common'

/**
 * 处理 koa-bodyparser 接收不到 navigator.sendBeacon 数据到问题
 */
export default async (ctx: Router.RouterContext, next: () => Promise<unknown>) => {
    const body = ctx.request.body;
    if (ctx.path.includes("/beacon") && isNullObject(body)) {
        const body = await coBody(ctx.req);
        ctx.request.body = JSON.parse(body);
    }
    await next();
};
