import { node } from "./node.js";
import { Queue } from "./queue.js";

export class knight {
  #treeValues = [];

  #moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  levelOrderFindTarget(startnode, targetnode) {
    if (!startnode || !targetnode) return;

    let queue = new Queue();
    queue.enqueue(startnode);
    this.#treeValues.push(startnode);

    let currentNode;
    let result = false;
    let movelist = [];

    while (!result.match) {
      currentNode = queue.dequeue();
      movelist = this.#moves;
      const validMoves = movelist
        .map(([r, c]) => [currentNode.row + r, currentNode.column + c])
        .filter(([r, c]) => r >= 0 && r <= 7 && c >= 0 && c <= 7);

      for (let i = 0; i < validMoves.length; i++) {
        let n = new node(validMoves[i][0], validMoves[i][1], currentNode);
        queue.enqueue(n);
        currentNode.moves.push(n);
        this.#treeValues.push(n);
      }

      result = this.isTarget(currentNode, targetnode);

      if (result.match) {
        return result.node;
      }
    }
    return currentNode;
  }

  retracePath(targetnode) {
    let path = [];
    let nbmoves = 0;
    while (targetnode.parent) {
      path.push([targetnode.row, targetnode.column]);
      targetnode = targetnode.parent;
      nbmoves += 1;
    }

    path.push([targetnode.row, targetnode.column]);

    return {array: path.reverse(), nbmoves};
  }

  isTarget(node, targetnode) {
    return {
      match: node.row === targetnode.row && node.column === targetnode.column,
      node,
    };
  }
}
