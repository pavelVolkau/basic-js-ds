const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(data) {
    this.node = addNewData(data, this.node);

    function addNewData(data, node) {
      if (!node) return (node = new Node(data));

      if (node.data === data) return node;

      if (data < node.data) {
        node.left = addNewData(data, node.left);
      } else {
        node.right = addNewData(data, node.right);
      }
      return node;
    }
  }

  has(data) {
    function hasData(data, node) {
      if (!node) return false;

      if (node.data === data) return true;

      if (data < node.data) {
        return hasData(data, node.left);
      } else {
        return hasData(data, node.right);
      }
    }

    return hasData(data, this.node);
  }

  find(data) {
    function findData(data, node) {
      if (!node) return null;

      if (node.data === data) return node;

      if (data < node.data) {
        return findData(data, node.left);
      } else {
        return findData(data, node.right);
      }
    }

    return findData(data, this.node);
  }

  remove(data) {
    this.node = removeData(data, this.node);

    function removeData(data, node) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeData(data, node.left);
        return node;
      } else if (data > node.data) {
        node.right = removeData(data, node.right);
        return node;
      } else {
        if (!node.left && !node.right) return null;

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRightNode = node.right;
        while (minRightNode.left) {
          minRightNode = minRightNode.left;
        }
        node.data = minRightNode.data;

        node.right = removeData(minRightNode.data, node.right);

        return node;
      }
    }
  }

  min() {
    function findMin(parentNode, node) {
      if (!node) return parentNode.data;

      return findMin(node, node.left);
    }

    return findMin(null, this.node);
  }

  max() {
    function findMax(parentNode, node) {
      if (!node) return parentNode.data;

      return findMax(node, node.right);
    }

    return findMax(null, this.node);
  }
}

module.exports = {
  BinarySearchTree,
};
