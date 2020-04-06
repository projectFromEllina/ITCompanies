export const firstFun = <T>(items: Array<T>, defaultValue?: T): T => {
    return items.length === 0 ? defaultValue : items[0];
};

export const lastFun = <T>(items: Array<T>, defaultValue?: T): T => {
    return items.length === 0 ? defaultValue : items[items.length - 1];
};

export const sortBy = <T, K extends keyof T>(items: Array<T>, property: K, comparer: ((a: T[K], b: T[K]) => boolean) = (a, b) => a < b) =>
    items.sort((a, b) => comparer(a[property], b[property])? -1: 1);
