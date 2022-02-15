type UnaryFunction<A, B> = (a: A) => B;
type BinaryFunction<A, B, C> =  (_a: A, _b: B) => C; 

// TODO: Implement this
// TODO: Name it
// TODO: Use it.
const partial = <A,B,C>(
    g: BinaryFunction<A, B, C>,
    a: A
): UnaryFunction<B, C> => {
    
    /*
        We are partially applying the function 'g' with this definition. 
        It is similar to how we have the add function as an example.
        Eg: add: Int -> Int -> Int 
        with: ((add)2) would mean we yield a function which always adds 2 to its input.
        Exactly like that, we yield a function ((g)a) which always applies a to its input.
    */
    return (_:B): C => g(a, _);
}


console.log(partial(Math.pow,2)(2));