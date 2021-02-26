export const isWindow = () => global.window ? true : false;
export const isNode = () => !isWindow();
