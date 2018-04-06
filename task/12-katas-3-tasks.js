
/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left,
 * right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ];
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false
 */
export function findStringInSnakingPuzzle(puzzle, searchStr) {
  for (let x = 0; x < puzzle[0].length; x++) {
    for (let y = 0; y < puzzle.length; y++) {
      if (puzzle[y][x] === searchStr[0]) {

        let used = [];
        for (let i = 0; i < puzzle.length; i++) {
          used[i] = [];
        }

        let curX = x;
        let curY = y;
        used[curY][curX] = true;

        for (let i = 1; i < searchStr.length; i++) {
          
          let foundNext;
          if (curX < puzzle[0].length - 1 && !used[curY][curX + 1] && searchStr[i] === puzzle[curY][curX + 1]) {
            curX++;
            foundNext = true;
          } else if (curX > 0 && !used[curY][curX - 1] && searchStr[i] === puzzle[curY][curX - 1]) {
            curX--;
            foundNext = true;
          } else if (curY < puzzle.length - 1 && !used[curY + 1][curX] && searchStr[i] === puzzle[curY + 1][curX]) {
            curY++;
            foundNext = true;
          } else if (curY > 0 && !used[curY - 1][curX] && searchStr[i] === puzzle[curY - 1][curX]) {
            curY--;
            foundNext = true;
          }

          if (foundNext) {
            used[curY][curX] = true;
          } else {
            break;
          }

          if (i === searchStr.length - 1) {
            return true;
          }

        }
      }
    }
  }
  return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from
 *    the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
export function* getPermutations(chars) {
  let counter = [];
  let result = [];
  result.push(chars);
  let arr = chars.split('');

  function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  for (let i = 0; i < arr.length; i++) {
    counter[i] = 0;
  }

  let i = 0;
  while (i < arr.length) {
    if (counter[i] < i) {
      swap(arr, i % 2 ? counter[i] : 0, i);
      counter[i]++;
      i = 0;
      result.push(arr.join(''));
    } else {
      counter[i] = 0;
      i++;
    }
  }

  yield* result;
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units
 * you have already bought, or do nothing.
 * Therefore, the most profit is the maximum difference of all pairs in a sequence
 * of stock prices.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
export function getMostProfitFromStockQuotes(quotes) {
  let balance = 0;
  let count = 0;

  for (let i = 0; i < quotes.length; i++) {

    let max = quotes[i];
    for (let j = i; j < quotes.length; j++) {
      max = Math.max(quotes[j], max);
    }

    if (quotes[i] === max) {
      balance += quotes[i] * count;
      count = 0;
    } else {
      balance -= quotes[i];
      count++;
    }
  }

  return balance;
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 *
 * @class
 *
 * @example
 *
 *   var urlShortener = new UrlShortener();
 *   var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *   var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 *
 */
export function UrlShortener() {
  this.urlAllowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

  encode(url) {
    throw new Error('Not implemented');
  },

  decode(code) {
    throw new Error('Not implemented');
  }
};
