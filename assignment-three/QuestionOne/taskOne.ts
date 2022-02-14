/*
    Task One: 
    Chosen type is the one given in examples. 
    Implementations are straight forward and have been documented with the use of console logs after function calls.
    Functions made:
        1. match
        2. fold
        3. map
        4. find
        5. isEmpty
        6. contains
*/


type NotStarted = {__tag: "notStarted"};
type Finished<T> = {__tag: "finished", val: T};
type Progress = {__tag: "progress", val: {val: number}};
type ProgressOption<T> = NotStarted | Finished<T> | Progress;


const notStarted = <T>(): ProgressOption<T> => {
    return {__tag: "notStarted"};
}
const finished = <T>(fin: T): ProgressOption<T> => {
    return {
        __tag: "finished",
        val: fin
    }
}
const progress = <T>(p: number): ProgressOption<T> => {
    return {
        __tag: "progress",
        val: {val: p}
    }
}


const isNotStarted = <T>(p: ProgressOption<T>): p is NotStarted => p.__tag === "notStarted";
const isFinished = <T>(p: ProgressOption<T>): p is Finished<T> => p.__tag === "finished";
const isProgress = <T>(p: ProgressOption<T>): p is Progress => p.__tag === "progress";

const ns = notStarted();
const fin = finished(100);
const prog = progress(25);

const fold = <T>(p: ProgressOption<T>, d: () => T | number): T | number => {
    if(isNotStarted(p)){
        return d();
    }
    if(isFinished(p)){
        return p.val;
    }
    if(isProgress(p)){
        return p.val.val;
    }
}
console.log(
    "Fold - Progress(25): ",
    fold(
        prog,
        () => "default"
    )
);

const match = <T, T2>(
    p: ProgressOption<T>,
    f: (t: T) => T2,
    g: (t: number) => T2,
    d: () => T2
    ): T2 => {
        if(isNotStarted(p)){
            return d();
        }
        else if(isFinished(p)){
            return f(p.val);
        }
        else if(isProgress(p)){
            return g(p.val.val);
        }
    }
console.log(
    "NotStarted: ",
    match(
    ns,
    (t) => t + "%. Task is finished.",
    (t) => t.toString() + "%. Task is in progress.",
    () => "0%. Task has not started yet."
    )
);
console.log(
    "Progress: ",
    match(
    prog,
    (t) => t + "%. Task is finished.",
    (t) => t.toString() + "%. Task is in progress.",
    () => "0%. Task has not started yet."
    )
);
console.log(
    "Finished: ",
    match(
    fin,
    (t) => t + "%. Task is finished.",
    (t) => t.toString() + "%. Task is in progress.",
    () => "0%. Task has not started yet."
    )
);


const map = <T, T2>(p: ProgressOption<T>, f: (val: T) => T2, g: (val: number) => number): ProgressOption<T2> => {
    if(isNotStarted(p)){
        return notStarted();
    }
    else if(isFinished(p)){
        return finished(f(p.val));
    }
    else if(isProgress(p)){
        return progress(g(p.val.val));
    }
}
console.log(
    "map: ",
    map(
        fin,
        (val) => val + 200,
        (val) => val + 111,
    )
);

//find for arrays in js returns undefined if nothing is found
const find = <T>(p: ProgressOption<T>, val: T | number) => {
    if(isFinished(p)){
        return p.val === val ? p.val : undefined;
    }
    else if(isProgress(p)){
        return p.val.val === val ? p.val : undefined;
    }

    return undefined;
}
console.log(
    "Find(100): ",
    find(
        fin,
        100
    )
);

const isEmpty = <T>(p: ProgressOption<T>) => isNotStarted(p) ? true : false;
console.log(
    "isEmpty - NotStarted: ",
    isEmpty(ns)
);

const contains = <T>(p: ProgressOption<T>, val: T | number) => {
    if(isFinished(p)){
        return p.val === val;
    }
    else if(isProgress(p)){
        return p.val.val === val;
    }
    else{
        return false;
    }
}
console.log(
    "Contains(25) with Finished",
    contains(
        fin,
        25
    )
);