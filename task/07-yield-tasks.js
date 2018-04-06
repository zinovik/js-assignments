
/** ******************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ****************************************************************************************** */


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *т
 * @return {Iterable.<string>}
 *
 */
export function* get99BottlesOfBeer() {
  let i = 99;
  yield `${i} bottles of beer on the wall, ${i} bottles of beer.`;
  i--;
  while (i > 1) {
    yield `Take one down and pass it around, ${i} bottles of beer on the wall.`;
    yield `${i} bottles of beer on the wall, ${i} bottles of beer.`;
    i--;
  }
  yield `Take one down and pass it around, 1 bottle of beer on the wall.`;
  yield `1 bottle of beer on the wall, 1 bottle of beer.`;
  yield `Take one down and pass it around, no more bottles of beer on the wall.`;
  yield `No more bottles of beer on the wall, no more bottles of beer.`;
  yield `Go to the store and buy some more, 99 bottles of beer on the wall.`;
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
export function* getFibonacciSequence() {
  yield 0;
  yield 1;
  let x2 = 0;
  let x1 = 1;
  let x0;
  while (true) {
    x0 = x1 + x2;
    yield x0;
    x2 = x1;
    x1 = x0;
  }
}


/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
export function* depthTraversalTree(root) {
  yield root;

  let children = [];

  if (root.children) {
    root.children.reverse();
    root.children.forEach(child => {
      children.push(child);
    });
  }

  while (children.length) {
    let child = children.pop();
  
    yield child;

    if (child.children) {
      child.children.reverse();
      child.children.forEach(child => {
        children.push(child);
      });
    }
  }

  return;
}


/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
export function* breadthTraversalTree(root) {
  const nodes = [];
  nodes.push(root);

  let i = 0;

  while (nodes.length > i) {
    if (nodes[i].children) {
      nodes[i].children.forEach(child => {
        nodes.push(child);
      });
    }
    i++;
  }

  yield* nodes;
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
export function* mergeSortedSequences(source1, source2) {
  let it1 = source1();
  let it2 = source2();

  let done = false;

  while (done !== true) {
    let next1 = it1.next();
    let next2 = it2.next();
    done = next1.done && next2.done;
    if (!done) {
      if ((next1.value || next1.value === 0) && (next2.value || next2.value === 0)) {
        yield Math.min(next1.value, next2.value);
        yield Math.max(next1.value, next2.value);
      } else {
        if (next1.value || next1.value === 0) {
          yield next1.value;
        } else if (next2.value || next2.value === 0) {
          yield next2.value;
        }
      }
    }
  }
}
