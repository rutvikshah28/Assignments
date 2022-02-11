//f: A-> [A] -> [A]
const filter =
    <A>(a: A) =>
    (arr: Array<A>): Array<A> => {
        return arr.filter((val) => val !== a);
    };
console.log("Filter: ", filter(2)([2, 3, 4, 5, 6, 7, 2])); // result: [3, 4, 5, 6, 7]

// f: number -> Number -> [A] -> [A]
const slice =
    <A>(num1: number, num2: number) =>
    (arr: Array<A>): Array<A> => {
        return arr.slice(num1, num2);
    };
console.log("Slice: ", slice(1, 3)(["a", "b", "c", "d", "e", "f"])); // result: ["b", "c"]

//f: [String] -> {String: any} -> {String: any}
const filterByKey = (arr: Array<string>, obj: Object): Object => {
    // filter out the object where keys dont match just like we did for our array filter function above
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) =>
            arr.includes(key) ? false : true
        )
    );
};

console.log(
    filterByKey(["p3", "p5", "p1"], {
        p1: "efrfefe",
        p2: "rferfgv",
        p3: "rfeggfergerge",
        p4: 32432,
        p5: 444,
    })
);

//f: [A] -> [B] -> [[A,B]]
const zippedList = <A, B>(a: Array<A>, b: Array<B>): [A, B][] => {
    return a.map((val, index) => [val, b[index]]);
};
console.log("zippedList: ", zippedList(["11", "12", "13"], ["21", "22", "23"]));
//result: [ ['11', '21'], ['12', '22'], ['13', '23'] ]

export {};
