import watch from '../lib/react-watch-state';

const ENV = global.window ? "WINDOW" : "NODE";
const IS_WINDOW = ENV === "WINDOW";
const IS_NODE = !IS_WINDOW;

const initStore = {
    pageState: IS_WINDOW ? ((global as any).INITIAL_STATE || {}) : {},
}
const store = watch(initStore, { debug: true });

export const useWatchState = store.useWatchState;
export const setState = store.setState;
export const getState = store.getState;