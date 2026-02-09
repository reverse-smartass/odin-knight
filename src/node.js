export class node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.rightchild = null;
    this.leftchild = null;
  }

  isLeaf() {
    return this.rightchild == null && this.leftchild == null ;
  }
}
