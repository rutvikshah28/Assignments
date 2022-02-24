# task-three-tree-lib
This package is meant to provide a support for trees in typescript.
To get started:
```bash
npm i task-three-tree-lib
```

```typescript
import * as Tree from 'task-three-tree-lib';
```

- The Tree type is made up of disjoint union classes - Leaf and Branch.
```typescript
class Leaf<A> = {
    __tag: "leaf" = "leaf";
    readonly value: A;

    constructor(value: A){
        this.value = value;
    }
}

class Branch<A> = {
    __tag: "branch" = "branch";
    readonly left: Tree<A>;
    readonly right: Tree<A>;

    constructor(left: Tree<A>, right: Tree<A>){
        this.left = left;
        this.right = right;
    }
}
```

The library consists of following functionality:
1. Type Guards - isLeaf() and isBranch()
2. size() - counts total number of branches and leaves.
3. max() - Finds the max number in a tree of numbers.
4. depth() - Finds the longest path from root to leaf.
5. map() - Maps the leafs of a tree of type A to a tree of type B using a user supplied function.
6. filter() - Filters out tree leaves based on filter condition provided as a function.
7. zip() - combines elements of two trees if they are on the same level, omits doing so otherwise.
8. Please follow [this](https://github.com/rutvikshah28/Assignments/tree/main/assignment-four/QuestionThree) link to find the source code.

--- 

<center>Thank you for reading!</center>

---
