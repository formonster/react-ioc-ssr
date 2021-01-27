import UserImplements from "@/implements/UserImplements";
import config from "@/config";
import { resSuccess } from "@/utils/response";
import { checkServerResult, nowTimeSecond } from "@/utils/common";
import axios from "axios";
import UserModel from "@/models/UserModel";
import ResponseData from "@/interface/ResponseData";

class UserService implements UserImplements {

    /**
     * 登陆
     * @param account 账号
     * @param password 密码
     */
    async login(account: string, password: string): Promise<ResponseData<UserModel>> {

        if (!account || !password) throw new Error("请求参数错误！");

        // 查询用户
        const userRes = await axios.get(config.serverRoot + "/base/list", {
            params: {
                table: "user",
                columns: "id,name,account,password",
                where: { account, is_delete: 0 }
            }
        })
        const data = userRes.data;

        if (data.status !== 200) throw new Error(data.msg);
        else {
            const user: UserModel = data.result[0];

            // 判断账号是否存在
            if (!user) throw new Error("您的账号不存在！");

            // 检查密码是否正确
            if (password !== user.password) throw new Error("密码错误！");

            return resSuccess<UserModel>(user);
        }
    }

    /**
     * 注册
     * @param account 账号
     * @param password 密码
     */
    async register(account: string, password: string): Promise<ResponseData<UserModel>> {
        if (!account || !password) throw new Error("请求参数错误！");

        // 查询用户
        const userRes = await axios.get(config.serverRoot + "/base/list", {
            params: {
                table: "user",
                columns: "id,name,account,password",
                where: { account, is_delete: 0 }
            }
        })
        const data = userRes.data;

        if (data.status !== 200) throw new Error(data.msg);
        else {

            const user: UserModel = data.result[0];

            // 判断账号是否存在
            if (user) throw new Error("您的账号已存在！");

            // 创建用户
            const createUserRes = await axios.post(config.serverRoot + "/base/add", {
                table: "user",
                data: {
                    account, password, create_time: nowTimeSecond(),
                }
            })
            const createUserResData: ResponseData<UserModel> = createUserRes.data;

            if (checkServerResult(createUserResData)) throw new Error(createUserResData.msg);

            return resSuccess<UserModel>(createUserResData.result);
        }
    }
}

export default UserService;