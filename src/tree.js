import { node } from "./node.js";
import { Queue } from "./queue.js";

export class binaryTree {
  #rootnode;
  #treeValues = [];

  constructor(arr) {
    {
      this.#rootnode = this.buildTree(arr, 0, arr.length - 1);
    }
  }

  print() {
    this.#prettyPrint(this.#rootnode);
  }

  #prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.#prettyPrint(
      node.rightchild,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false,
    );
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    this.#prettyPrint(
      node.leftchild,
      `${prefix}${isLeft ? "    " : "│   "}`,
      true,
    );
  }

  getrootnode() {
    return this.#rootnode;
  }

  setrootnode(node) {
    this.#rootnode = node;
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return;
    }

    let middle = start + Math.floor((end - start) / 2);

    let root = new node(arr[middle]);

    root.leftchild = this.buildTree(arr, start, middle - 1);
    root.rightchild = this.buildTree(arr, middle + 1, end);

    if (root.leftchild) root.leftchild.parent = root;
    if (root.rightchild) root.rightchild.parent = root;

    return root;
  }

  binarySearch(value, node) {
    if (!node || this.#rootnode === null || this.#rootnode === undefined) {
      return false;
    }

    if (value === node.value) return { result: true, node };

    if (value > node.value) {
      return this.binarySearch(value, node.rightchild);
    } else {
      return this.binarySearch(value, node.leftchild);
    }
  }

  insert(value, currentNode = this.#rootnode) {
    if (this.#rootnode === null || this.#rootnode === undefined) {
      this.#rootnode = new node(value);
      return false;
    }

    if (value > currentNode.value) {
      if (!currentNode.rightchild) {
        currentNode.rightchild = new node(value);
        return true;
      } else {
        return this.insert(value, currentNode.rightchild);
      }
    }

    if (value < currentNode.value) {
      if (!currentNode.leftchild) {
        currentNode.leftchild = new node(value);
        return true;
      } else {
        return this.insert(value, currentNode.leftchild);
      }
    }
    return false;
  }

  //delete successor node and return the value
  successor(node) {
    let s;
    if (node.rightchild) {
      s = node.rightchild;
    } else {
      return undefined;
    }

    while (s && s.leftchild) {
      s = s.leftchild;
    }
    return s;
  }

  delete(value) {
    let search = this.binarySearch(value, this.#rootnode);
    if (search.result) {
      this.deleteOperations(search.node);
      return true;
    }
    return false;
  }

  deleteOperations(node) {
    if (!node) return;

    if (node.rightchild && node.leftchild) {
      let s = this.successor(node);
      node.value = s.value;
      this.deleteOperations(s);
      return;
    }

    if (!node.parent) {
      if (!node.rightchild && !node.leftchild) {
        this.#rootnode = null;
        return;
      }

      if (node.rightchild) {
        this.#rootnode = node.rightchild;
      } else {
        this.#rootnode = node.rightchild;
      }
      this.#rootnode.parent = null;
      return;
    }

    const isrightchild = node.parent && node.parent.rightchild === node;

    if (!node.rightchild && !node.leftchild) {
      if (isrightchild) {
        node.parent.rightchild = null;
      } else {
        node.parent.leftchild = null;
      }
      return;
    }

    let replacement = node.leftchild ? node.leftchild : node.rightchild;

    if (replacement) replacement.parent = node.parent;

    if (isrightchild) {
      node.parent.rightchild = replacement;
    } else {
      node.parent.leftchild = replacement;
    }
    return;
  }

  levelOrderForEach(callback, node = this.#rootnode) {
    if (typeof callback !== "function") {
      console.error("The provided callback is not a function.");
      throw new TypeError();
    }

    if (!node) return;

    let queue = new Queue();

    queue.enqueue(node);

    let currentNode;

    while (!queue.isEmpty()) {
      currentNode = queue.dequeue();

      if (currentNode.leftchild) {
        queue.enqueue(currentNode.leftchild);
      }
      if (currentNode.rightchild) {
        queue.enqueue(currentNode.rightchild);
      }
      callback(currentNode);
      i++;
    }
    return queue.items;
  }

  height(node) {
    if (!node) return -1;

    const leftHeight = this.height(node.leftchild);
    const rightHeight = this.height(node.rightchild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(childnode, parentnode) {
    let d = 0;
    let n = childnode;
    while (n !== parentnode) {
      n = n.parent;
      d++;
    }
    return n === null ? -1 : d;
  }

  isBalanced(node) {
    if (!node) {
      return true;
    }

    const right = this.isBalanced(node.leftchild);
    const left = this.isBalanced(node.rightchild);

    //console.log(right + " right " + node.value);
    //console.log(left + " left " + node.value);

    return (
      Math.abs(this.height(node.leftchild) - this.height(node.rightchild)) <=
        1 &&
      right &&
      left
    );
  }

  getTreeValues(){
    this.#treeValues = [];
    this.inOrderForEach(this.#rootnode);
    return this.#treeValues;
  }

  inOrderForEach(node) {
    if(!node) return;

    this.inOrderForEach(node.leftchild);
    this.#treeValues.push(node.value);
    console.log(node.value);
    this.inOrderForEach(node.rightchild);    
  }

  rebalance(){
    const data = this.getTreeValues();
    this.#rootnode = this.buildTree(data, 0, data.length - 1);
  }
}
