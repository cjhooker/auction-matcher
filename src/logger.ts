let debug: boolean = false;

export let setDebug = (value: boolean) => {
    debug = value;
}

export let logElapsedTime = (func: Function, caption: string= "Elapsed time:") => {
    let startTime = new Date().getTime();
    let result = func();
    let endTime = new Date().getTime();
    console.log(`${caption} ${endTime - startTime}ms`);
    return result;
};

export let logObject = (obj: object, caption?: string, debugOnly: boolean = true) => {
    if (!debugOnly || debug) {
        if (caption) {
            console.log(`${caption}`);
        }
        console.log(obj);
        console.log();
    }
}
