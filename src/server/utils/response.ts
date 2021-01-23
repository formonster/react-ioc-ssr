export const resError = (msg: string) => ({ msg, status: 0 });
export const resSuccess = (result: unknown) => ({ msg: "执行成功", result, status: 200 });