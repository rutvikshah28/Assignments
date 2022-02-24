# Assignment 4 Solututions

## Question 1

```bash
path: /QuestionOne/
```

1. As per the question, custom utility types have been created using mapped type implementations.
2. Part (4) which guides to making a type A that builds on keys that are not in common with another type B, can and has been implemented with mapping types and using the Omit type as well.
3. Please use the commands below to build and test the task.

```bash
tsc taskOne.ts
node taskOne.js
```

## Question 2

```bash
path: /QuestionTwo
```

1. As per the question, I have implemented the Form interface.
2. I have created a type for formValues which is used to map into errors.
3. For the formErrors, I have created an error type which maps the keys from formValues into strings.
4. Further I have wrapped the Error Type with a Partial to make the errors optional so we don't have to write the errors for every case.
5. Please follow the commands below to build and test the code.

```bash
tsc taskTwo.ts
node taskTwo.js
```

## Question 3

```bash
path: /QuestionThree
```

1. As per the question, I have implemented a tree type which builds from Branch or Leaf classes.
2. I have implemented the functions - size, max, depth, map, filter, zip.
3. Please follow the commands below to build, run and test the tree.

```bash
tsc *.ts
node test.js
```
4. I have published the library on [npm](https://www.npmjs.com/package/task-three-tree-lib) aswell.
