import { IApi } from "@/interface/IApi";
import { GET, POST, route } from "awilix-koa";
import Router from "@koa/router";

@route('/api')
class ApiController {
    private apiService: IApi;
    constructor({ apiService }: { apiService: IApi }) {
        this.apiService = apiService;
    }
    @route('/list')
    @GET()
    async list(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
        const data = await this.apiService.getInfo();
        ctx.body = data;
    }
    @route('/homeData')
    @GET()
    async homeData(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
        ctx.body = {
            count: 1
        };
    }
    @route('/beacon')
    @POST()
    async error(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
        const params = ctx.request.body;
        console.log("❌ 收到错误信息", params);
        ctx.body = params
    }
}

export default ApiController;