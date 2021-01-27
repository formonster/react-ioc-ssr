interface UserModel {
    id?: string;
    name: string;
    account: string;
    password?: string;
    email?: string;
    create_time?: Date;
    is_delete?: number;
}

export default UserModel;