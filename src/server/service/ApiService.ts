import { IApi } from "@/interface/IApi";
import { IData } from "@/interface/IData";

class ApiService implements IApi {
    getInfo(): Promise<IData> {
        return new Promise<IData>(function (resolve, reject) {
            resolve({
                item: "🍎 后台数据",
                data: [1, 2, 3]
            })
        })
    }
}

export default ApiService;