import ResponseData from "@/interface/ResponseData"

export const resError = (msg: string): ResponseData<unknown> => ({ msg, status: 0 });
export const resSuccess = <T>(result: T): ResponseData<T> => ({ msg: "执行成功", result, status: 200 });