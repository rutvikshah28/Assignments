# Assignment 1 Solututions

## Question 1

```bash
path: /QuestionOne/
```

### Part One - Elm :
1. As per the question, I have implemented a partial function application.
2. The function builds a url.
3. Signature: Url : String -> String -> String -> String
4. Please follow the commands below to build and test the elm program.

```bash
cd elm-implementation
elm make src/Main.elm
```
5. Once done, you can find an index.html file, please open it to see the results.

### Part Two - Typescript :
1. As per the question, I have implemented the same partial function in typescript.
2. Please follow the commands to build and run the program.

```bash
cd typescript-implementation
tsc taskOne.ts
node taskOne.js
```

## Question 2

```bash
path: /QuestionTwo
```
1. As per the question, I have made use of compose and pipe from 'ramda'
2. I have also created a custom compose function using reduce.
3. I apply these functions and log their results.
4. To build and run the program, follow the commands below.

```bash
npm install ramda
tsc taskTwo.ts
node taskTwo.js
```

## Question 3

```bash
path: /QuestionThree
```

1. As per the question, I have implemented and given a name to the function signature provided.
2. The function name is 'Partial' and it does exactly what its name suggests - Partial application for a function.
3. My test case includes partially applying the Math.pow function for the number '2'.
4. To build and run the program, follow the commands below.
   
```bash
tsc taskThree.ts
node taskThree.js
```
