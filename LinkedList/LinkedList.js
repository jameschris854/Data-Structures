const node = require('./Node');

class LinkedList {

    head
    tail
    length

    constructor(value) {
        if (value) {
            this.createNewList(value)
        }
    }

    createNewList(value) {
        this.head = new node(value);
        this.tail = this.head;
        this.length = 1
    }

    /**
     * @description adds element to list end.
     * @return modified list
    */
    push(value) {

        // handle if list has no nodes i.e new list.
        if (!this.head) {
            const newNode = new node(value);
            this.head = newNode;
            this.tail = newNode;
        } else {
            const newNode = new node(value);
            this.tail.next = newNode;
            this.tail = newNode;
        }

        // increase length of linked list
        this.length++

        // add new item and return whole list.
        return this
    }

    /**
     * @description removes last element from the list and returns modified list.
     * @return removed item
    */
    pop() {

        // case1: empty linked list.
        if (!this.head) return undefined;


        // case2: linked list with more than one item.
        let tempNode = this.head;
        let previousNode = this.head;

        while (tempNode.next) {
            previousNode = tempNode;
            tempNode = tempNode.next;
        }
        this.tail = previousNode;
        this.tail.next = null;
        this.length--

        // case3: linked list with 1 item.
        if (this.length === 0) {
            this.head = null
            this.tail = null
        }

        return tempNode
    }

    /**
     * @description adds item to list start.
     * @return modified list
     */
    unShift(value) {

        let newNode = new node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++

        return this

    }

    /**
     * @description removes item from list start.
     * @return removed item
    */
    shift() {
        //case1: empty list
        if (!this.head) return undefined;

        //case2: list with more than one item.
        let tempNode = this.head;
        this.head = this.head.next;
        tempNode.next = null;

        this.length--;

        //case3: list with one item.
        if (this.length === 0) {
            this.tail = null
        }

        return tempNode;
    };

    /**
     * @description gets an item from linkedlist by index.
     * @param index of item to get
     * @returns item from linkedlist
     */
    get(index) {

        if (index < 0 || index >= this.length) return;

        let tempNode = this.head;

        for (let i = 0; i < index; i++) {
            tempNode = tempNode.next
        }

        return tempNode;
    }

    /**
     * 
     * @param index index of item to change.
     * @param value new value to be assigned to item.
     * @returns true if list successfully modified.
     */
    set(index, value) {
        let temp = this.get(index);

        if (temp) {
            temp.value = value;
            return true
        }

        return false
    }

    /**
     * 
     * @param {*} index 
     * @param {*} value 
     * @returns true if successfully inserted.
     */
    insert(index, value) {
        if (index === 0) return this.unShift(value)
        if (index === this.length - 1) return this.push(value)
        if (index < 0 || index >= this.length) return;

        let newNode = new node(value);
        let before = this.get(index - 1);
        let after = before.next;

        before.next = newNode;
        newNode.next = after;
        this.length++
        return true;
    }

    remove(index) {
        if (index === 0) return this.shift()
        if (index === this.length - 1) return this.pop()
        if (index < 0 || index >= this.length) return;

        let before = this.get(index - 1);
        let temp = before.next;
        let after = temp.next;

        before.next = after
        temp.next = null

        this.length--
        return true
    }

    reverse() {
        let temp = this.head;
        this.head = this.tail;
        this.tail = temp
        let before = null;
        let after = temp.next
        
        for(let i=0; i< this.length ;i++){
            after = temp.next;
            temp.next = before;
            before = temp;
            temp = after;
        }

        this.tail.next = null

        return this
    }

    /**
     * @description convert linkedlist to array
     * @return values of linked list in array structure
     */
    get toArr() {
        let arr = []
        if (!this.head) return arr

        let tempNode = this.head
        while (tempNode.next) {
            arr.push(tempNode.value);
            tempNode = tempNode.next;
        }
        arr.push(this.tail.value)
        return arr
    }


}

module.exports = LinkedList;