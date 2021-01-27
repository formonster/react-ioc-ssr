import UserModel from "@/models/UserModel";
import ResponseData from "@/interface/ResponseData";

interface UserInterface {
    login(account: string, password: string): Promise<ResponseData<UserModel>>
    register(account: string, password: string): Promise<ResponseData<UserModel>>
}

export default UserInterface;