export type Tree<A> = Leaf<A> | Branch<A>;

export class Leaf<A> {
    __tag: "leaf" = "leaf";
    readonly value: A;

    constructor(value: A){
        this.value = value;
    }
};

export class Branch<A> {
    __tag: "branch" = "branch";
    readonly left: Tree<A>;
    readonly right: Tree<A>;

    constructor(left: Tree<A>, right: Tree<A>){
        this.left = left;
        this.right = right;
    }
};

const isLeaf = <A>(leaf: Tree<A>): leaf is Leaf<A> => 
    leaf.__tag === "leaf";

const isBranch = <A>(branch: Tree<A>): branch is Branch<A> => 
    branch.__tag === "branch";

const l: Tree<number> = new Leaf(1);
const b: Tree<number> = new Branch(l, l);         
const testTree: Tree<number> = new Branch(b, new Branch(new Leaf(-10), new Leaf(-30)));


// Size: Tree<A> -> number
// Size counts the number of branches and leaves
export const size = <A>(tree: Tree<A>): number => {
    if(tree.__tag === "branch"){
        //DFS traversal
        return size(tree.left) + size(tree.right) + 1;
    }
    else{
        //Leaf node -- return count
        return 1;
    }
}

// Max: Tree<number> -> number
// Max finds the maximum number in a tree of numbers.
export const max = (tree: Tree<number>, currMax?: number): number => {
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

// Depth: Tree<A> -> number
// Returns longest path from root to a leaf
export const depth = <A>(tree: Tree<A>, currDepth: number): number => {
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

//Map: Tree<A> -> f: A->B -> Tree<B>
// Map maps the elements of a tree to the function 'f' and results into a tree of type B
export const map = <A, B>(tree: Tree<A>, f:(value: A)=>B): Tree<B> => {
    if(tree.__tag === "branch"){
        return new Branch(map(tree.left, f), map(tree.right, f));
    }
    else{
        return new Leaf(f(tree.value));
    }
}

//Filter: f:(a:A->boolean) -> Tree<A> -> Tree<A>
// Filter returns a tree without the element 'a' present in it.
export const filter = <A>(f: (a: A) => boolean ,tree: Tree<A>): Tree<A> | undefined => {
    // As a basic implementation, we will remove element a from our tree
    if(tree.__tag === "branch"){
        const left = filter(f, tree.left);
        const right = filter(f, tree.right);
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
        if(f(tree.value))
            return undefined;
        else{
            return tree;
        }
    }
};

//Zip: Tree<A> -> Tree<B> -> Tree<(A | B)[]>
// Zip combines the elements of both trees if they are on the same level and retuns a new tree.
export const zip = <A, B>(treeOne: Tree<A>, treeTwo: Tree<B>): Tree<(A | B)[]> | undefined => {
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