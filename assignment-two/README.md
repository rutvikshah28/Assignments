# Assignment 2 Solututions

## Question 1

```bash
path: /QuestionOne/
```

1. All function implementations and naming has been performed.
2. Check file taskOne.ts to assess the implementations
3. Building and Running:

```bash
tsc taskOne.ts
node taskOne.js
```

## Question 2

```bash
path: /QuestionTwo/src/
```

1. This is made with a create-react-app and a typescript template.
2. It is a small application that fetches a post and its comments.
3. It also computers meta data like getting the number of comments for a post using a custom mapreduce function implementation.
4. There has been usage of fp-ts library for its either and match functions to better typeguard the fetched data.
5. You can find the file of importance in the QuestionTwo subdirectory:

```bash
/QuestionTwo/src/QuestionTwo/TaskTwo.tsx
```

6. To build and run:

```bash
yarn build
yarn start
```

## Question 3

```bash
path: /QuestionThree/
```

### Part 1

```bash
path: /QuestionThree/PartOne.tsx
```

1. Part one focuses on refactoring react based code from heyauto codebase.
2. I chose to refactor the RunningAnalytics view in ha-admin.
3. I found a lot of code being re-used so I implemented a partial function which, depending on the inputs passed to it returned jsx data back.

```bash
path-on-codebase: heyauto/packages/ha-admin/src/analytics/views/RunningAnalytics.tsx
```

### Part 2

```bash
path: /QuestionThree/partTwo.ts
```

1. Part two focuses on refactoring nest based code from heyauto codebase.
2. I chose to perform refactoring by using pipe from fp-ts.
3. Since my go-to spot / comfort spot on yd-backend is faqs, I started from there and found I could implement the updateFaq function there differently.

```bash
path-on-codebase: heyauto/packages/yd-backend/src/faqs/faqs.service.ts
```
