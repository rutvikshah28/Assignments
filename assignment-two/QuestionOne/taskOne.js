"use strict";
exports.__esModule = true;
//f: A-> [A] -> [A]
var filter = function (a) {
    return function (arr) {
        return arr.filter(function (val) {
            return val !== a;
        });
    };
};
console.log("Filter: ", filter(2)([2, 3, 4, 5, 6, 7, 2])); // result: [3, 4, 5, 6, 7]
// f: number -> Number -> [A] -> [A]
var slice = function (num1, num2) {
    return function (arr) {
        return arr.slice(num1, num2);
    };
};
console.log("Slice: ", slice(1, 3)(["a", "b", "c", "d", "e", "f"])); // result: ["b", "c"]
//f: [String] -> {String: any} -> {String: any}
var filterByKey = function (arr, obj) {
    // filter out the object where keys dont match just like we did for our array filter function above
    return Object.fromEntries(
        Object.entries(obj).filter(function (_a) {
            var key = _a[0];
            return arr.includes(key) ? false : true;
        })
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
var zippedList = function (a, b) {
    return a.map(function (val, index) {
        return [val, b[index]];
    });
};
console.log("zippedList: ", zippedList(["11", "12", "13"], ["21", "22", "23"]));
