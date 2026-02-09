import { node } from "./node";
import { knight } from "./tree";

describe("path", () => {

    let kn  = new knight();

    let startnode = new node(3,3);

    let targetnode = new node(4,3);

    let retrace = kn.retracePath(kn.levelOrderFindTarget(startnode, targetnode))

    console.log(`You made it in ${retrace.nbmoves} moves `);
    console.log(retrace.array)

 

  test("levelOrderFindTarget", () => {
    expect(kn.levelOrderFindTarget(startnode, targetnode).row).toStrictEqual(targetnode.row);
    expect(kn.levelOrderFindTarget(startnode, targetnode).column).toStrictEqual(targetnode.column);
  });
})