export const classnames = (...args: Array<string | boolean | undefined | null>) => {

    let ret = '';

    [...args].forEach((arr) => {
        if (arr) ret += arr + " ";
    }
    );

    return ret;
}
