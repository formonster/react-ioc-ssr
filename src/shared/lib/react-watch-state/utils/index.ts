import get from "lodash/get";
import set from "lodash/set";

/**
 * 设置对象中的属性
 * @param {*} target
 * @param {*} path
 * @param {*} value
 */
export const oset = set

/**
 * 获取对象中某个属性
 * @param {*} target
 * @param {*} path
 */
export const oget = get

/**
 * 返回对象中指定的多个属性
 * @param {Object} target
 * @param {Array} paths
 */
export const ogets = (target: object, paths: Array<string>) => {
    return paths.map(path => oget(target, path));
}