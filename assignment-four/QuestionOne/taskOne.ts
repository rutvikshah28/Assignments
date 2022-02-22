/*
    Task 1:
        Implementing utility and mapped types.

*/

interface IExample {
    keyOne: string;
    keyTwo: boolean;
    keyThree: number;
}



//Part 1 - Custom Omit Type
type OmitImplementation<T, K extends string> = {
    [key in keyof T as key extends K ? never : key] : T[key];
}

const omitKeyTwo: OmitImplementation<IExample, "keyTwo"> = {
    keyOne: "First Key",
    keyThree: 3,
}

const omitKeyOneThree: OmitImplementation<IExample, "keyThree" | "keyOne"> = {
    keyTwo: true,
}

console.log("Custom Omit: (keyTwo)\n", Object.keys(omitKeyTwo)); //Ans = ['keyOne', 'keyThree']
console.log("Custom Omit: (keyOne, keyThree)\n",Object.keys(omitKeyOneThree)); //Ans = ['keyTwo']



//Part 2 - Custom Pick Type

type PickImplementation<T, K extends string> = {
    [key in keyof T as key extends K ? key : never] : T[key]
}

const pickKeyOne: PickImplementation<IExample, "keyOne"> = {
    keyOne: "First key",
}

const pickKeyOneThree: PickImplementation<IExample, "keyOne" | "keyThree"> = {
    keyOne: "First Key",
    keyThree: 3,
}

console.log("CustomPick: (keyOne)\n", Object.keys(pickKeyOne)); //Ans = ['keyOne']
console.log("Custom Pick: (keyOne, keyThree)\n", Object.keys(pickKeyOneThree)); //Ans = ['keyOne', 'keyThree']



//Part 3(a) - Custom Partial Type

type PartialImplementation<T> = {
    [key in keyof T]? : T[key]
}

const partialWKeyOne: PartialImplementation<IExample> = {
    keyOne: "First Key"
}

const partialWKeyTwoThree: PartialImplementation<IExample> = {
    keyTwo: false,
    keyThree: 3,
}

console.log("CustomPartial: (keyOne)\n", Object.keys(partialWKeyOne)); //Ans = ['keyOne']
console.log("CustomPartial: (keyTwo, keyThree)\n", Object.keys(partialWKeyTwoThree)); //Ans = ['keyTwo', 'keyThree']

//Part 3(b) - Custom Required Type

interface IRequiredExample extends IExample {
    keyFour? : string;
    keyFive? : boolean;
    keySix? : number;
}

type RequiredImplementation<T> = {
    [key in keyof T]-? : T[key]
}

const requiredKeys: RequiredImplementation<IRequiredExample> = {
    keyOne: "First Key",
    keyTwo: false,
    keyThree: 3,
    keyFour: "Fourth Key",
    keyFive: true,
    keySix: 6,
}

console.log("CustomRequired: (keys One to Six)\n", Object.keys(requiredKeys)); //Ans = ['keyOne', 'keyTwo', 'keyThree', 'keyFour', 'keyFive 'keySix']

//Part 4 - new type with props from Y not in X

type X = {
    x1: string,
    x2: boolean,
    xy1: number,
    x3: string,
    xy2: boolean,
    x4: number,
};

type Y = {
    y1: string,
    y2: boolean,
    xy1: number,
    y3: string,
    xy2: boolean,
    y4: number,
}

/*
    Can also extend by simply using the Omit type here --
    It has been commented below but feel free to uncomment that one and comment out the mapped implementation to check it out.
*/

//type TNotInS<T,S> = Omit<S, keyof T>
type TNotInS<T,S> = {
    [k in keyof S as k extends keyof T ? never : k] : S[k]
}

const noCommonsY: TNotInS<X, Y> = {
    y1: "First Key",
    y2: true,
    y3: "Third Key",
    y4: 4,
}

const noCommonsX: TNotInS<Y, X> = {
    x1: "First Key",
    x2: true,
    x3: "Third Key",
    x4: 4,
}

console.log("TNotInS: (x1, x2, x3, x4)\n", Object.keys(noCommonsX)); //Ans = ['x1', 'x2', 'x3', 'x4']
console.log("CustomPartial: (y1, y2, y3, y4)\n", Object.keys(noCommonsY)); //Ans = ['y1', 'y2', 'y3', 'y4']