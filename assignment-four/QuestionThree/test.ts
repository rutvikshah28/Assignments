import * as Tree from "./taskThree";

const tree = new Tree.Branch(
    new Tree.Branch(
        new Tree.Leaf(1),
        new Tree.Leaf(2),
    ),
    new Tree.Branch(
        new Tree.Branch(
            new Tree.Leaf(3),
            new Tree.Leaf(4)
        ),
        new Tree.Branch(
            new Tree.Leaf(5),
            new Tree.Branch(
                new Tree.Branch(
                    new Tree.Branch(
                        new Tree.Leaf(6),
                        new Tree.Leaf(7)
                    ),
                    new Tree.Leaf(8)
                ),
                new Tree.Leaf(9)
            )
        )
    )
);

const smallerTree = new Tree.Branch(
    new Tree.Leaf(2),
    new Tree.Branch(
        new Tree.Leaf(3),
        new Tree.Leaf(-4)
    )
)

/*
    TEST CASES FOR SUCCESS

*/

console.log("--- Testing the functions from taskTree ---");

try{
    console.log("working on size()")
    if(Tree.size(tree) === 17){
        console.log("size() -- passed")
    }
    else{
        console.log("size() -- failed");
    }
    console.log("working on max()");
    if(Tree.max(tree) === 9){
        console.log("max() -- passed")
    }
    else{
        console.log("max() -- failed")
    }
    console.log("working on depth()");
    if(Tree.depth(tree, 0) === 6){
        console.log("depth() -- passed")
    }
    else{
        console.log("depth() -- failed")
    }
    console.log("working on map()");
    try{
        console.log(Tree.map(smallerTree, Math.abs));
        console.log("map() -- passed");
    }
    catch(err){
        console.log("map() -- failed");
    }

    console.log("working on filter()");
    try{
        console.log(Tree.filter((x: number) => x >= 0, smallerTree))
        console.log("filter() -- passed")
    }
    catch(err){
        console.log("filter() -- failed");
    }

    console.log("working on zip()");
    try{
        console.log(Tree.zip(
            new Tree.Branch(
                new Tree.Leaf(1),
                new Tree.Leaf(2)
            ),
            new Tree.Branch(
                new Tree.Leaf("a"),
                new Tree.Leaf("b")
            )
        ));
        console.log("zip() -- passed"); 
    }
    catch(err){
        console.log("zip() -- failed");
    }
}
catch(err){
    console.log("Error: ", err);
}