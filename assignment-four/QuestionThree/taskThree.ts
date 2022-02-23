type Tree<A> = Leaf<A> | Branch<A>;

class Leaf<A> {
    __tag: "leaf" = "leaf";
    readonly value: A;

    constructor(value: A){
        this.value = value;
    }
};

class Branch<A> {
    __tag: "branch" = "branch";
    readonly left: Tree<A>;
    readonly right: Tree<A>;

    constructor(left: Tree<A>, right: Tree<A>){
        this.left = left;
        this.right = right;
    }
};
const l: Tree<number> = new Leaf(1);
const b: Tree<number> = new Branch(l, l);         
const testTree: Tree<number> = new Branch(b, new Branch(new Leaf(-10), new Leaf(-30)));



// Size: Tree<A> -> number
// Size counts the number of branches and leaves
const size = <A>(tree: Tree<A>): number => {
    if(tree.__tag === "branch"){
        //DFS traversal
        return size(tree.left) + size(tree.right) + 1;
    }
    else{
        //Leaf node -- return count
        return 1;
    }
}
console.log("The size of the tree is: ", size(testTree)); // Ans = 7



// Max: Tree<number> -> number
// Max finds the maximum number in a tree of numbers.
const max = (tree: Tree<number>, currMax?: number): number => {
    if(tree.__tag === "branch"){
        currMax = max(tree.left, currMax);
        currMax = max(tree.right, currMax);
        return currMax;
    }
    else{
        if(currMax){
            if(currMax < tree.value)
                return tree.value;
            else
                return currMax;
        }
        else{
            return tree.value;
        }
    }
}
console.log("The Max number in tree is: ", max(testTree));



// Depth: Tree<A> -> number
// Returns longest path from root to a leaf
const depth = <A>(tree: Tree<A>, currDepth: number): number => {
    if(tree.__tag === "branch"){
        
        const leftDepth = depth(tree.left, currDepth);
        const rightDepth = depth(tree.right, currDepth);

        if(leftDepth > rightDepth)
            return leftDepth + 1;
        else 
            return rightDepth + 1;
    }
    else{
        return 0;
    }
}
console.log(
    "Depth of the tree is: \n",
    depth(
        new Branch(
            new Leaf("a"),
            new Branch(
                new Branch(
                    new Branch(
                        new Leaf("b"),
                        new Leaf("c")
                    ),
                    new Leaf("d")
                ),
                new Leaf("e")
            )
        ),
        0
    )
); // Ans = 4



//Map: Tree<A> -> f: A->B -> Tree<B>
// Map maps the elements of a tree to the function 'f' and results into a tree of type B
const map = <A, B>(tree: Tree<A>, f:(value: A)=>B): Tree<B> => {
    if(tree.__tag === "branch"){
        return new Branch(map(tree.left, f), map(tree.right, f));
    }
    else{
        return new Leaf(f(tree.value));
    }
}

console.log("The Absolute value after mapping is: \n", map(
    testTree,
    Math.abs
))


//Filter: Tree<A> -> A -> Tree<A>
// Filter returns a tree without the element 'a' present in it.
const filter = <A>(tree: Tree<A>, a: A): Tree<A> => {
    // As a basic implementation, we will remove element a from our tree
    if(tree.__tag === "branch"){
        const left = filter(tree.left, a);
        const right = filter(tree.right, a);
        if(left){
            if(right){
                return new Branch(left, right);
            }
            else{
                return left;
            }
        }
        else{
            if(right){
                return right;
            }
        }
    }
    else{
        if(tree.value === a)
            return undefined;
        else{
            return tree;
        }
    }
};
console.log(
    "The Filtered Tree is: \n", 
    filter(testTree, 10)
)



//Zip: Tree<A> -> Tree<B> -> Tree<(A | B)[]>
// Zip combines the elements of both trees if they are on the same level and retuns a new tree.
const zip = <A, B>(treeOne: Tree<A>, treeTwo: Tree<B>): Tree<(A | B)[]> => {
    if(treeOne.__tag === "branch" && treeTwo.__tag === "branch"){
        const left = zip(treeOne.left, treeTwo.left);
        const right = zip(treeOne.right, treeTwo.right);
        if(left){
            if(right){
                return new Branch(left,right);
            }
            else{
                return left;
            }
        }
        else{
            if(right){
                return right;
            }
        }
    }
    else{
        if(treeOne.__tag === "leaf" && treeTwo.__tag === "leaf"){
            return new Leaf([treeOne.value, treeTwo.value]);
        }
    }
}

console.log(
    "The Zipped trees are: \n",
    zip(
        new Branch(
            new Leaf(10),
            new Branch(
                new Leaf(20),
                new Leaf(30)
            )
        ),
        new Branch(
            new Leaf("a"),
            new Branch(
                new Branch(
                    new Leaf("b"),
                    new Leaf("c")
                ),
                new Leaf("d")
            )
        )
    )
);

