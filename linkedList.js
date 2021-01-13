class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}
  
class LinkedList {
    constructor() {
        this.head = null;
    }
    insertFirst(n) {
        this.head = new _Node(n, this.head);
    }
    insertLast(n) {
        if (this.head === null) {
            this.insertFirst(n);
        } else {
            let temp = this.head;
            while (temp.next !== null) {
                temp = temp.next;
            }
            temp.next = new _Node(n, null);
        }
    }
    find(n) {
        let currNode = this.head;
        if (!this.head) {
            return null;
        }
        while (currNode.value !== n) {
            if (currNode.next === null) {
                return null;
            } else {
                currNode = currNode.next;
            }
        }
        return currNode;
    }
    remove(n) {
        if (!this.head) {
            return null;
        }
        if (this.head.value === n) {
            this.head = this.head.next;
            return;
        }
        let currNode = this.head;
        let prevNode;
        if (currNode === null) {
            console.log('not found!');
            return;
        }
        prevNode.next = currNode.next;
    }
    insertAfter(newValue, afterTarget) {
        if (!this.head) {
            this.insertFirst(newValue);
        }
        let currNode = this.head;
        while (currNode.next !== null && currNode.value !== afterTarget) {
            currNode = currNode.next;
        }
        if (currNode.next === null) {
            console.log('Target not found');
            return;
        }
        let newNode = new _Node(newValue, currNode.next);
        currNode.next = newNode;
    }
    insertAt(newValue, position) {
        let count = 1;
        let currNode = this.head;
        while (count < position) {
            if (currNode.next === null) {
                console.log('Could not find that position');
                return;
            }
            count++;
            currNode = currNode.next;
        }
        currNode.next = new _Node(newValue, currNode.next);
    }
}
  
function toArray(linkedList) {
    let currentNode = linkedList.head;
    let result = [];
    while (currentNode.next !== null) {
        result.push(currentNode.value);
        currentNode = currentNode.next;
    }
    result.push(currentNode.value);
    return result;
}
  
module.exports = {
    LinkedList,
    toArray,
    _Node,
};