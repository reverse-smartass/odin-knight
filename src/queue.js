export class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  // Add to back
  enqueue(element) {
    this.items[this.tail] = element;
    this.tail++;
  }

  // Remove from front
  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  peek() {
    return this.items[this.head];
  }

  isEmpty() {
    return this.tail - this.head === 0;
  }

  get length() {
    return this.tail - this.head;
  }
}