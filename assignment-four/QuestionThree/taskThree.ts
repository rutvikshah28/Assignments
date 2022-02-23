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

const size = <A>(tree: Tree<A>): number => {
    if(tree.__tag === "branch"){
        //DFS traversal
        return size(tree.left) + size(tree.right);
    }
    else{
        //Leaf node -- return count
        return 1;
    }
}

const l: Tree<number> = new Leaf(1);
const b: Tree<number> = new Branch(l, l);

const testTree: Tree<number> = new Branch(b, b);

console.log(size(testTree)); // Ans = 4

// const max = <A>(tree: Tree<number>): number => {


// }
