import { IApi } from "@/interface/IApi";
import { GET, route } from "awilix-koa";
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
}

export default ApiController;