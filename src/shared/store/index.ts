import watch from '../lib/react-watch-state';
import { isWindow } from "@/check"

const IS_WINDOW = isWindow();

const initStore = {
    IS_WINDOW,
    pageState: IS_WINDOW ? (window.INITIAL_STATE || {}) : {},
}
const store = watch(initStore, { debug: true });

export const useWatchState = store.useWatchState;
export const setState = store.setState;
export const getState = store.getState;