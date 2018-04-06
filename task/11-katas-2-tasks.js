
/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist
 * in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account
 * that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it
 * into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
export function parseBankAccount(bankAccount) {
  /* implement your code here */
  // throw new Error('Not implemented');
  let nums = [
    ' _ \n' +
    '| |\n' +
    '|_|',
    '   \n' +
    '  |\n' +
    '  |',
    ' _ \n' +
    ' _|\n' +
    '|_ ',
    ' _ \n' +
    ' _|\n' +
    ' _|',
    '   \n' +
    '|_|\n' +
    '  |',
    ' _ \n' +
    '|_ \n' +
    ' _|',
    ' _ \n' +
    '|_ \n' +
    '|_|',
    ' _ \n' +
    '  |\n' +
    '  |',
    ' _ \n' + 
    '|_|\n' +
    '|_|',
    ' _ \n' +
    '|_|\n' +
    ' _|'
  ];
  let strings = bankAccount.split('\n');
  let result = '';
  for (let i = 0; i < strings[0].length / 3; i++) {
    let part1 = strings[0].substring(i * 3, i * 3 + 3);
    let part2 = strings[1].substring(i * 3, i * 3 + 3);
    let part3 = strings[2].substring(i * 3, i * 3 + 3);
    let num = `${part1}\n${part2}\n${part3}`;
    result += nums.indexOf(num);
  }
  return +result;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make
 * sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>
 *      'The String global object',
 *      'is a constructor for',
 *      'strings, or a sequence of',
 *      'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>
 *      'The String',
 *      'global',
 *      'object is a',
 *      'constructor',
 *      'for strings,',
 *      'or a',
 *      'sequence of',
 *      'characters.'
 */
export function* wrapText(text, columns) {
  let words = text.split(' ');
  let size = 0;
  while (words.length > 0) {
    for (let i = 0; i < words.length; i++) {
      size += words[i].length + 1;
      if (size - 1 > columns) {
        let str = words.splice(0, i || 1);
        yield str.join(' ');
        size = 0;
        break;
      }
      if (i === words.length - 1) {
        yield words.join(' ');
        words = [];
      }
    }
  }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
export const PokerRank = {
  StraightFlush: 8,
  FourOfKind: 7,
  FullHouse: 6,
  Flush: 5,
  Straight: 4,
  ThreeOfKind: 3,
  TwoPairs: 2,
  OnePair: 1,
  HighCard: 0
};

export function getPokerHandRank(hand) {
  let allSuits = ['♣', '♦', '♥', '♠'];
  let allRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  hand = hand.map(value => {
    return {
      suit: allSuits.indexOf(value[value.length - 1]),
      rank: allRanks.indexOf(value.slice(0, value.length - 1))
    };
  });

  hand.sort((a, b) => {
    return a.rank > b.rank;
  });

  let flush = true;
  let lastSuit = hand && hand[0] && hand[0].suit;

  let straight = true;
  let lastRank = hand && hand[0] && hand[0].rank;

  let matches = [];
  let lastMatchCount = 1;

  hand.forEach((value, index) => {
    if (index === 0) {
      return;
    }

    if (value.suit !== lastSuit) {
      flush = false;
    }
    
    if (value.rank - lastRank !== 1 && (value.rank !== 9 || lastRank !== 0)) {
      straight = false;
    }

    if (value.rank === lastRank) {
      lastMatchCount++;
    }

    if (value.rank !== lastRank || index === 4) {
      if (lastMatchCount > 1) {
        matches.push(lastMatchCount);
      }
      lastMatchCount = 1;
    }

    lastRank = value.rank;
  });

  if (straight && flush) {
    return PokerRank.StraightFlush;
  } else if (matches[0] === 4) {
    return PokerRank.FourOfKind;
  } else if (matches[0] + matches[1] === 5) {
    return PokerRank.FullHouse;
  } else if (flush) {
    return PokerRank.Flush;
  } else if (straight) {
    return PokerRank.Straight;
  } else if (matches[0] === 3) {
    return PokerRank.ThreeOfKind;
  } else if (matches[0] + matches[1] === 4) {
    return PokerRank.TwoPairs;
  } else if (matches[0] === 2) {
    return PokerRank.OnePair;
  }

  return PokerRank.HighCard; 
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +,
 * vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+        '+------------+\n'+
 *    '|            |\n'+        '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+   =>   '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+        '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'         '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
export function* getFigureRectangles(figure) {
  /* implement your code here */
  throw new Error('Not implemented');
}
