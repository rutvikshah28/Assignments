import { compose, pipe } from "ramda";
/*
   As per basic highschool maths, we know that if we have a function f(x) and g(x), we can have a function h(x) which is a composition of f and g.
   As such, h(x) = f(g(x)) which means g(x) is the input to f(x).
   Alternatively, we can think of piping usages better in terms of terminal commands. For instance we want to 'cat' at file and 'sort' it, on the terminal,
   we write: "cat filename | sort"
   Differences b/n compose and pipe:
    1. Compose evaluates functions from right to left, while pipe evaluates function from left and feeds its output to the function towards its right.
    2. Compose in itself is closer to how fog(x) is evaluated mathematically, so it is easier to link and understand the workings in context to mathematics.
       On the other hand, pipe is more like a sequence of things happening. Whenever I hear about piping, I always think it in terms of how there is a sequence of 
       events happening where the input to one event is the output of another.
    Extensions: 
     2. We see compose being used in heyauto in various packages. One common occurance is using compose to dispatch an action which can be seen throughout the codebase.
        We also see the ussge of pipe a lot in yd-backend. It is being used when we want to feed the output of first function to the next and so on.
        The idealogy is simple, piping or composing could and should be used whenever we are breaking a task down into multiple interdependent functions. 
        Instead of nesting functions in parameters, we could use composing techniques to increase readability of the code significantly which also helps us maintain, 
        scale and debug our implementations. 
*/

const customCompose = (...args: any[]) => {
    const reversedFunctions = args.reverse();
    const [firstFunc, ...restFuncs] = reversedFunctions;
    return (...funcArgs: any) => restFuncs.reduce((res, func) => func(res), firstFunc(...funcArgs));

}

const f = (x: number) => {
    //f(x) = x^2 + 18
    return (Math.pow(x,2) + 18);
}

const g = (y: number): number => {
    //g(y) = |y*2 -20|
    return (Math.abs(Math.pow(y,2) - 20));
}

const composeH = compose(f, g);
const customComposeH = customCompose(f, g);
const pipeH = pipe(g, f);


console.log("compose for f(g(2)) = ",composeH(2)); // Ans = 274
console.log("customCompose for f(g(2)) = ", customComposeH(2)); // Ans = 274
console.log("pipe for f(g(2)) = ", pipeH(2)); // Ans = 274

console.log("compose for f(g(3)) = ",composeH(3)); // Ans = 139
console.log("customCompose for f(g(3)) = ", customComposeH(3)); // Ans = 139
console.log("pipe for f(g(3)) = ", pipeH(3)); // Ans = 139

console.log("compose for f(g(4)) = ",composeH(4)); // Ans = 34
console.log("customCompose for f(g(4)) = ", customComposeH(4)); // Ans = 34
console.log("pipe for f(g(4)) = ", pipeH(4)); // Ans = 34