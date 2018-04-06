/**
 * Takes two strings including only letters from a to z.
 * Returns a new sorted string containing distinct letters.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'azy', 'bk' => 'abkyz'
 *   'zxxlal','laxk'    => 'aklxz'
 *   'abcdefghijklmnop',  'lmnopqrstuvwxyz'  => 'abcdefghijklmnopqrstuvwxyz'
 */
export function distinctLettersString(value1, value2) {
  let arr = `${value1}${value2}`.split('').sort();
  let lastValue;
  arr = arr.filter(value => {
    let lValue = lastValue;
    lastValue = value;
    return value !== lValue;
  });
  return arr.join('');
}


/**
 * Takes a string with any characters.
 * Returns an object containing appearence of every distinct letters in lower case.
 *
 * @param {string} value
 * @return {Object}
 *
 * @example
 *  'Who you are, Buddy?' => { a:1, d:2, e:1, h:1, o:2, r:1, u:2, y:2 }
 *
 */

export function lowerLetters(value) {
  let arr = value.split('');
  let result = {};
  arr.forEach(value => {
    if (value >= 'a' && value <= 'z') {
      result[value] = result[value] ? result[value] + 1 : 1;
    }
  });
  return result;
}

/**
 * Write a function that will convert a string into title case, given an optional
 * list of exception (minor words). The list of minor words will be given as a
 * string with each word separated by a space. Your function should ignore the
 * case of the minor words string - it should behave in the same way even if the
 * case of the minor word is changed
 *
 * @param {string} the original string to be converted
 * @param {string} list of minor words that must always be lowercase except for
 *                  the first word in the string
 * @return {string}
 *
 * @example
 *    'a clash if KINGS', 'a an the of'  =>  'A Clash of Kings'
 *    'THE WIND IN THE WILLOWS', 'The In'  => 'The Wind in the Willows'
 *    'the quick brown fox'  => 'The Quick Brown Fox'
 */

export function titleCaseConvert(title, minorWords) {
  let titleArr = title.split(' ');
  let minorArr = minorWords ? minorWords.split(' ') : [];
  minorArr = minorArr.map(word => {
    return word.toLowerCase();
  });
  titleArr = titleArr.map(word => {
    let wordNew = word.toLowerCase();
    if (minorArr.indexOf(wordNew) > -1) {
      return wordNew;
    }
    return wordNew[0].toUpperCase() + wordNew.substring(1, wordNew.length);
  });
  let titleNew = titleArr.join(' ');
  titleNew = titleNew[0].toUpperCase() + titleNew.substring(1, titleNew.length);
  return titleNew;
}

/**
 * Your job is to create a calculator which evaluates expressions in Reverse Polish
 * notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation). Empty expression
 * should evaluate to 0. Expression without operation returns the last number.
 *
 * @param {string} RPN string, each number and operation separated by a space
 *
 * @return {Number}
 *
 * @example
 *  ''  =>  0  // empty expression returns 0
 *  '1 2 3'  =>  3  // expression without operation returns the last number
 *  '4 2 +'  =>  6  // 4 + 2
 *  '2 5 * 2 + 3 /'  =>  4   //  ((5 * 2) + 2) / 3
 *  '5 1 2 + 4 * + 3 -'  =>  14   // 5 + ((1 + 2) * 4) -3
 */

export function calcRPN(expr) {
  if (!expr) {
    return 0;
  }

  let arr = expr.split(' ');
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];

    if (isNaN(element)) {
      let n2 = res.pop();
      let n1 = res.pop();
      res.push(eval(n1 + element + n2));
    } else {
      res.push(element);
    }
  }

  return res.pop();
}
