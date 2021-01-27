interface ResponseData<T> {
    status: number;
    msg: string;
    result?: T
}

export default ResponseData;