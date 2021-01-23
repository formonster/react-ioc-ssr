/**
 * 判断 target 是否是对象及属性是否存在
 * @param {*} target
 * @param {*} field
 * @param {*} info
 */
export const has = function (target: any, field: string, info: string, autoFill: boolean = false) {
    if (typeof target !== 'object') throw new Error(`${info} is not a object!`);
    // 如果没有此属性就创建一个并赋值为空对象
    if (!Reflect.has(target, field)) {
        if (autoFill) {
            target[field] = {};
            console.warn(`${info} is not defined!`);
        } else {
            throw new Error(`${info} is not defined!`)
        }
    }
}

/**
 * 获取目标属性的父级
 * @param {*} target
 * @param {*} path
 */
export const getParent = (target: object, path: Array<any>, autoFill: boolean = false) => {
    let infoPath = "";
    if (path.length === 1) {
        return target
    }
    let current: any = target;
    while (path.length > 1) {
        const next = path.shift();
        infoPath += infoPath ? ('.' + next) : next;
        has(current, next, infoPath, autoFill)
        current = current[next];
    }
    return current;
}

/**
 * 设置对象中的属性
 * @param {*} target
 * @param {*} path
 * @param {*} value
 */
export const oset = (target: object, path: string | Array<string>, value: any) => {

    let infoPath = typeof path === "string" ? path : "";
    if (!Array.isArray(path)) path = path.split('.');

    let current = getParent(target, [...path]);
    const end = path[path.length - 1];

    has(current, end, infoPath)
    current[end] = value;
}

/**
 * 获取对象中某个属性
 * @param {*} target
 * @param {*} path
 */
export const oget = (target: object, path: string | Array<string>, autoFill: boolean = false) => {
    let infoPath = typeof path === "string" ? path : "";
    if (!Array.isArray(path)) path = path.split('.');

    let current = getParent(target, [...path], autoFill);
    const end = path[path.length - 1];

    has(current, end, infoPath)
    return current[end];
}

/**
 * 返回对象中指定的多个属性
 * @param {Object} target
 * @param {Array} paths
 */
export const ogets = (target: object, paths: Array<string>, autoFill: boolean = false) => {
    return paths.map(path => oget(target, path, autoFill));
}

/**
 * @description 生成一个指定位数的随机字符串
 * @param { Number } length 参数名称
 */
export const getRandomStr = (length = 32) => {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var nums = "";
    for (var i = 0; i < length; i++) {
        var id = Math.round(Math.random() * 61);
        nums += chars[id];
    }
    return nums;
}