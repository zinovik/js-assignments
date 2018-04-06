
/** *****************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String  *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the result of concatenation of two strings.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'aa', 'bb' => 'aabb'
 *   'aa',''    => 'aa'
 *   '',  'bb'  => 'bb'
 */
export function concatenateStrings(value1, value2) {
  return `${value1 || ''}${value2 || ''}`;
}

/**
 * Returns the length of given string.
 *
 * @param {string} value
 * @return {number}
 *
 * @example
 *   'aaaaa' => 5
 *   'b'     => 1
 *   ''      => 0
 */
export function getStringLength(value) {
  return value ? value.length : '';
}

/**
 * Returns the result of string template and given parameters firstName and lastName.
 * Please do not use concatenation, use template string :
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
 *
 * @param {string} firstName
 * @param {string} lastName
 * @return {string}
 *
 * @example
 *   'John','Doe'      => 'Hello, John Doe!'
 *   'Chuck','Norris'  => 'Hello, Chuck Norris!'
 */
export function getStringFromTemplate(firstName, lastName) {
  return `Hello${(firstName || lastName ? ', ' : '')}${firstName || ''}${(firstName && lastName) ? ' ' : ''}${lastName || ''}!`;
}

/**
 * Extracts a name from template string 'Hello, First_Name Last_Name!'.
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'Hello, John Doe!' => 'John Doe'
 *   'Hello, Chuck Norris!' => 'Chuck Norris'
 */
export function extractNameFromTemplate(value) {
  let nameStart = value.indexOf(', ') + 2;
  let nameEnd = value.length - 1;
  return (nameStart !== -1) ? value.slice(nameStart, nameEnd) : '';
}


/**
 * Returns a first char of the given string.
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'John Doe'  => 'J'
 *   'cat'       => 'c'
 */
export function getFirstChar(value) {
  return value ? value.charAt(0) : '';
}

/**
 * Removes a leading and trailing whitespace characters from string.
 *
 * @param {string} value
 * @return {string}
 *
 * @example
 *   '  Abracadabra'    => 'Abracadabra'
 *   'cat'              => 'cat'
 *   '\tHello, World! ' => 'Hello, World!'
 */
export function removeLeadingAndTrailingWhitespaces(value) {
  return value ? value.trim() : '';
}

/**
 * Returns a string that repeated the specified number of times.
 *
 * @param {string} value
 * @param {string} count
 * @return {string}
 *
 * @example
 *   'A', 5  => 'AAAAA'
 *   'cat', 3 => 'catcatcat'
 */
export function repeatString(value, count) {
  return (value && count) ? value.repeat(count) : '';
}

/**
 * Remove the first occurrence of string inside another string
 *
 * @param {string} str
 * @param {string} value
 * @return {string}
 *
 * @example
 *   'To be or not to be', 'not'  => 'To be or to be'
 *   'I like legends', 'end' => 'I like legs',
 *   'ABABAB','BA' => 'ABAB'
 */
export function removeFirstOccurrences(str, value) {
  return str ? str.replace(value, '') : '';
}

/**
 * Remove the first and last angle brackets from tag string
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *   '<div>' => 'div'
 *   '<span>' => 'span'
 *   '<a>' => 'a'
 */
export function unbracketTag(str) {
  if (!str) return '';
  let first = str.indexOf('<');
  let last = str.lastIndexOf('>');
  let startPart = first !== -1 ? str.slice(0, first) : '';
  let middlePart = last !== -1 ? str.slice(first + 1, last) : str.slice(first + 1, str.length);
  let endPart = last !== -1 ? str.slice(last + 1, str.length) : '';
  return `${startPart}${middlePart}${endPart}`;
}


/**
 * Converts all characters of the specified string into the upper case
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *   'Thunderstruck' => 'THUNDERSTRUCK'
 *  'abcdefghijklmnopqrstuvwxyz' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 */
export function convertToUpperCase(str) {
  return str ? str.toUpperCase() : '';
}

/**
 * Extracts e-mails from single string with e-mails list delimeted by semicolons
 *
 * @param {string} str
 * @return {array}
 *
 * @example
 *   'angus.young@gmail.com;brian.johnson@hotmail.com;bon.scott@yahoo.com' =>
 *     ['angus.young@gmail.com', 'brian.johnson@hotmail.com', 'bon.scott@yahoo.com']
 *   'info@gmail.com' => ['info@gmail.com']
 */
export function extractEmails(str) {
  return str ? str.split(';') : [];
}

/**
 * Returns the string representation of rectangle with specified width and height
 * using pseudograhic chars
 *
 * @param {number} width
 * @param {number} height
 * @return {string}
 *
 * @example
 *
 *            '┌────┐\n'+
 *  (6,4) =>  '│    │\n'+
 *            '│    │\n'+
 *            '└────┘\n'
 *
 *  (2,2) =>  '┌┐\n'+
 *            '└┘\n'
 *
 *             '┌──────────┐\n'+
 *  (12,3) =>  '│          │\n'+
 *             '└──────────┘\n'
 *
 */
export function getRectangleString(width, height) {
  if (!width || !height || width < 2 || height < 2) return '\n';
  let firstString = `┌${'─'.repeat(width - 2)}┐\n`;
  let middleString = `│${' '.repeat(width - 2)}│\n`;
  let lastString = `└${'─'.repeat(width - 2)}┘\n`;
  return `${firstString}${middleString.repeat(height - 2)}${lastString}`;
}


/**
 * Encode specified string with ROT13 cipher
 * See details:  https://en.wikipedia.org/wiki/ROT13
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *
 *   'hello' => 'uryyb'
 *   'Why did the chicken cross the road?' => 'Jul qvq gur puvpxra pebff gur ebnq?'
 *   'Gb trg gb gur bgure fvqr!' => 'To get to the other side!'
 *   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' => 
 *          'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'
 *
 */
export function encodeToRot13(str) {
  if (!str) return '';

  const firstUpper = 65;
  const lowerShift = 32;

  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    if ((charCode >= firstUpper &&
      charCode < firstUpper + 13) ||
      (charCode >= firstUpper + lowerShift &&
        charCode < firstUpper + 13 + lowerShift)) {
      charCode += 13;
    } else if ((charCode >= firstUpper + 13 &&
      charCode - 13 <= firstUpper + 13) ||
      (charCode >= firstUpper + 13 + lowerShift &&
        charCode - 13 <= firstUpper + 13 + lowerShift)) {
      charCode -= 13;
    }
    newStr += String.fromCharCode(charCode);
  }
  return newStr;
}

/**
 * Returns true if the value is string; otherwise false.
 * @param {string} value
 * @return {boolean}
 *
 * @example
 *   isString() => false
 *   isString(null) => false
 *   isString([]) => false
 *   isString({}) => false
 *   isString('test') => true
 *   isString(new String('test')) => true
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String;
}


/**
 * Returns playid card id.
 *
 * Playing cards inittial deck inclides the cards in the following order:
 *
 *  'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
 *  'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
 *  'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
 *  'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'
 *
 * (see https://en.wikipedia.org/wiki/Standard_52-card_deck)
 * Function returns the zero-based index of specified card in the initial deck above.
 *
 * @param {string} value
 * @return {number}
 *
 * @example
 *   'A♣' => 0
 *   '2♣' => 1
 *   '3♣' => 2
 *     ...
 *   'Q♠' => 50
 *   'K♠' => 51
 */
export function getCardId(value) {
  if (!value) return '';
  let suits = ['♣', '♦', '♥', '♠'];
  let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  let suit = suits.indexOf(value[value.length - 1]);
  let rank = ranks.indexOf(value.slice(0, value.length - 1));
  if ((!suit && suit !== 0) || (!rank && rank !== 0)) return;
  return suit * 13 + rank;
}
