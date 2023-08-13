// @ts-ignore
export const isDefined = <T>(arg: T | null | undefined): arg is T extends null | undefined ? never : T => arg !== null && arg !== undefined;
