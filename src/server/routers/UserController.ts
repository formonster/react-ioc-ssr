import UserImplements from "@/implements/UserImplements";
import { GET, POST, route } from "awilix-koa";
import Router from "@koa/router";
import ResponseData from "../interface/ResponseData";
import UserModel from "../models/UserModel";

@route('/api')
class ApiController {

    private userService: UserImplements;
    constructor({ userService }: { userService: UserImplements }) {
        this.userService = userService;
    }

    @route('/user/login')
    @POST()
    async login(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<ResponseData<UserModel>> {

        const params = ctx.request.body;

        const account: string = params.account;
        const password: string = params.password;
        const data = await this.userService.login(account, password);
        ctx.body = data;
        return data;
    }

    @route('/user/register')
    @POST()
    async register(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<ResponseData<UserModel>> {

        const params = ctx.request.body;

        const account: string = params.account;
        const password: string = params.password;
        const data = await this.userService.register(account, password);
        ctx.body = data;
        return data;
    }
}

export default ApiController;