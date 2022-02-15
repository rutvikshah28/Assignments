// TODO: Implement this
// TODO: Name it
// TODO: Use it.
var partial = function (g, a) {
    /*
        We are partially applying the function 'g' with this definition.
        It is similar to how we have the add function as an example.
        Eg: add: Int -> Int -> Int
        with: ((add)2) would mean we yield a function which always adds 2 to its input.
        Exactly like that, we yield a function ((g)a) which always applies a to its input.
    */
    return function (_) { return g(a, _); };
};
console.log(partial(Math.pow, 2)(2));
