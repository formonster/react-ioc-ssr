import Event from './utils/event';
import { get, set } from "lodash";
import { ogets, oset, oget } from './utils';
import { useCallback, useState, useEffect } from 'react';

interface Option {
    debug?: boolean;
    autoFill?: boolean;
}

export default function watch(_initState: object, opt: Option = { debug: false, autoFill: false }) {

    if (!_initState) throw new Error('Initstate error, it must be an object!')

    let state: { [propName: string]: any; } = _initState;

    let storeEvent = new Event();
    // 所有被监听的 state 路径
    let watchPaths: Array<string> = [];

    function getState() {
        return state;
    }

    function setState(path: string, value: any) {

        oset(state, path, value);

        if (opt.debug) {
            console.group("STATE CHANGE");
            console.log("%cPATH:", "font-weight: bold;", path);
            console.log("%cVALUE:", "font-weight: bold;", value);
            console.groupEnd();
        }

        const re = new RegExp(`^${path.split('.').map(field => `(${field})`).join('|').replace(/\$/g, "\\$")}`);
        watchPaths.forEach(val => {
            if (re.test(val)) storeEvent.emit({ value, state }, val)
        })
    }

    function useWatchState(paths: string[]) {

        paths.forEach((val: string) => watchPaths.includes(val) ? '' : watchPaths.push(val))

        const [props, setProps] = useState(paths.map(path => oget(state, path)).map((val, i) => {
            return [(val && val.unload) ? val.default : val, (value: any) => setState(paths[i], value), paths[i]]
        }));

        const handlePropsChange = useCallback(function handlePropsChange({ value, state }) {
            setProps(paths.map(path => oget(state, path)).map((val, i) => [val, (value: any) => setState(paths[i], value), paths[i]]));
        }, [])

        useEffect(() => {
            paths.forEach((val: string) => storeEvent.on(handlePropsChange, val))
            return () => {
                paths.forEach((val: string) => storeEvent.off(handlePropsChange, val))
            }
        })

        // 过滤出需要自动获取的变量
        const autoLoads = paths.filter((path) => path.includes("$_"))
        setTimeout(() => {
            autoLoads.forEach((path) => {
                // 先查看是否已经获取到
                const data = get(state, path);
                if (!data.unload || data.loading) return;

                // 改变 loading 状态，避免重复查询
                setState(path, {
                    ...data,
                    loading: true
                });
                data.service(data.params).then((res: any) => {
                    const value = data.format ? data.format(res) : res;
                    setState(path, value);
                })
            })
        });

        return props;
    }

    return {
        getState,
        setState,
        useWatchState,
    }
}