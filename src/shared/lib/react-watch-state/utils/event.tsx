/**
 * @fileOverview 订阅者模式工具类
 * @author ZD @zd.com
 * @version 0.0.1
 */
class Event {

    private subscribers = {};

    /**
     * @constructor
     */
    constructor() {
        this.subscribers = { 'any': [] };
    }

    /**
     * @description 订阅事件
     * @param { Function } fn 处理函数
     * @param { String } type 事件名称，默认全局事件
     */
    on(fn: Function, type = 'any') {
        // console.log('on', type);
        let subs: any = this.subscribers;
        if (!subs[type]) return subs[type] = [fn];
        subs[type].push(fn);
    }

    /**
     * @description 取消订阅
     * @param { String } type 事件名称，默认全局事件
     */
    off(fn: Function, type = 'any') {
        const fns: Array<Function> = (this.subscribers as any)[type];
        const index = fns.findIndex(item => fn === item)
        fns.splice(index, 1);
    }

    /**
     * @description 发布事件
     * @param { * } content 事件参数
     * @param { String } type 事件名称，默认全局事件
     */
    emit(content: any, type = 'any') {
        const fns = (this.subscribers as any)[type] || [];
        if (fns.length > 0) fns.map((fn: Function) => fn(content));
        else console.error("没有订阅过此事件：", type);
    }
}

export default Event;