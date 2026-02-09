export class node {
  constructor(row, column, parent = null) {
    this.moves = [];
    this.row = row;
    this.column = column;
    this.parent = parent;
  }

  isLeaf() {
    return this.rightchild == null && this.leftchild == null ;
  }
}
