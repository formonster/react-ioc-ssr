import ResponseData from "@/interface/ResponseData";
import UserModel from "@/models/UserModel";

export const nowTimeSecond = () => Math.floor(new Date().getTime() / 1000);
// 检查服务端返回结果是否有异常
export const checkServerResult = (res: ResponseData<UserModel>) => res.status !== 200;
export const isNullObject = (o: object) => JSON.stringify(o) === "{}";