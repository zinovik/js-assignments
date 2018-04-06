
/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
export function createCompassPoints(sides = ['N', 'E', 'S', 'W']) {
  return [
    { abbreviation: 'N', azimuth: 0.00 },
    { abbreviation: 'NbE', azimuth: 11.25 },
    { abbreviation: 'NNE', azimuth: 22.50 },
    { abbreviation: 'NEbN', azimuth: 33.75 },

    { abbreviation: 'NE', azimuth: 45.00 },
    { abbreviation: 'NEbE', azimuth: 56.25 },
    { abbreviation: 'ENE', azimuth: 67.50 },
    { abbreviation: 'EbN', azimuth: 78.75 },

    { abbreviation: 'E', azimuth: 90.00 },
    { abbreviation: 'EbS', azimuth: 101.25 },
    { abbreviation: 'ESE', azimuth: 112.50 },
    { abbreviation: 'SEbE', azimuth: 123.75 },

    { abbreviation: 'SE', azimuth: 135.00 },
    { abbreviation: 'SEbS', azimuth: 146.25 },
    { abbreviation: 'SSE', azimuth: 157.50 },
    { abbreviation: 'SbE', azimuth: 168.75 },

    { abbreviation: 'S', azimuth: 180.00 },
    { abbreviation: 'SbW', azimuth: 191.25 },
    { abbreviation: 'SSW', azimuth: 202.50 },
    { abbreviation: 'SWbS', azimuth: 213.75 },

    { abbreviation: 'SW', azimuth: 225.00 },
    { abbreviation: 'SWbW', azimuth: 236.25 },
    { abbreviation: 'WSW', azimuth: 247.50 },
    { abbreviation: 'WbS', azimuth: 258.75 },

    { abbreviation: 'W', azimuth: 270.00 },
    { abbreviation: 'WbN', azimuth: 281.25 },
    { abbreviation: 'WNW', azimuth: 292.50 },
    { abbreviation: 'NWbW', azimuth: 303.75 },

    { abbreviation: 'NW', azimuth: 315.00 },
    { abbreviation: 'NWbN', azimuth: 326.25 },
    { abbreviation: 'NNW', azimuth: 337.50 },
    { abbreviation: 'NbW', azimuth: 348.75 }
  ];
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear 
 * at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
export function* expandBraces(str) {
  /* implement your code here */
  throw new Error('Not implemented');
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient 
 * of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
export function getZigZagMatrix(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push([]);
  }

  let i = 1;
  let j = 1;

  for (let e = 0; e < n * n; e++) {
    matrix[i - 1][j - 1] = e;
    if ((i + j) % 2 === 0) {
      if (j < n) {
        j++;
      } else {
        i += 2;
      }
      if (i > 1) {
        i--;
      }
    } else {
      if (i < n) {
        i++;
      } else {
        j += 2;
      }
      if (j > 1) {
        j--;
      }
    }
  }

  return matrix;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row 
 *  (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
export function canDominoesMakeRow(dominoes) {
  let tiles = [];
  let dubles = [];
  let freeDouble;
  dominoes.forEach(domino => {
    tiles.push(domino[0]);
    tiles.push(domino[1]);

    if (domino[0] === domino[1]) {
      dubles.push(domino[0]);
    }
  });

  tiles.sort();

  let ends = 0;
  for (let i = 0; i < 7; i++) {
    let count = 0;
    tiles.forEach(tile => {
      if (tile === i) {
        count++;
      }
    });
    if (count % 2) {
      ends++;
    }
    if (count === 2 && dubles.indexOf(i) >= 0) {
      freeDouble = true;
    }
  }

  return ends < 3 && !freeDouble;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end 
 *     integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to 
 *     more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
export function extractRanges(nums) {
  let result = '' + nums[0];
  nums.forEach((num, i) => {
    if (i === 0) {
      return;
    } else if (i === nums.length - 1) {
      if (num === nums[i - 1] + 1 &&
        num === nums[i - 2] + 2) {
        result += '-' + num;
      } else {
        result += ',' + num;
      }
    } else if (num === nums[i - 1] + 1) {
      if (num === nums[i - 2] + 2 &&
        num !== nums[i + 1] - 1) {
        result += '-' + num;
      } else if ((i === 1 || num !== nums[i - 2] + 2) &&
        num !== nums[i + 1] - 1) {
        result += ',' + num;
      }
    } else {
      result += ',' + num;
    }
  });
  return result;
}
