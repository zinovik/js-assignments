
/** ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
export function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.__proto__.getArea = () => this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
export function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
export function fromJSON(proto, json) {
  let obj = JSON.parse(json);
  obj.__proto__ = proto;
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and
 * pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and
 * implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear
 * and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify() =>
 *    '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify() =>
 *    'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify() =>
 *      'div#main.container.draggable + table#data ~ tr:nth-of-type(even) td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

export const cssSelectorBuilder = {

  _element: '',
  _id: '',
  _class: '',
  _attr: '',
  _pseudoClass: '',
  _pseudoElement: '',
  _combine: '',

  _new: true,

  stringify() {
    if (this._combine) {
      return this._combine;
    }

    let string = this._element;
    string += this._id;
    string += this._class;
    string += this._attr;
    string += this._pseudoClass;
    string += this._pseudoElement;

    return string;
  },

  element(value) {
    if (this._id || this._class || this._attr || this._pseudoClass || this._pseudoElement) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    if (this._element) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this._new) {
      let selector = Object.assign({}, this);
      selector._new = false;
      selector._element = value;
      return selector;
    }
    this._element = value;
    return this;
  },

  id(value) {
    if (this._class || this._attr || this._pseudoClass || this._pseudoElement) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    if (this._id) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this._new) {
      let selector = Object.assign({}, this);
      selector._new = false;
      return selector.id(value);
    }
    this._id = `#${value}`;
    return this;
  },

  class(value) {
    if (this._attr || this._pseudoClass || this._pseudoElement) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    if (this._new) {
      let selector = Object.assign({}, this);
      selector._new = false;
      return selector.class(value);
    }
    this._class += `.${value}`;
    return this;
  },

  attr(value) {
    if (this._pseudoClass || this._pseudoElement) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    if (this._new) {
      let selector = Object.assign({}, this);
      selector._new = false;
      return selector.attr(value);
    }
    this._attr += `[${value}]`;
    return this;
  },

  pseudoClass(value) {
    if (this._pseudoElement) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    if (this._new) {
      let selector = Object.assign({}, this);
      selector._new = false;
      return selector.pseudoClass(value);
    }
    this._pseudoClass += `:${value}`;
    return this;
  },

  pseudoElement(value) {
    if (this._pseudoElement !== '') {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this._new) {
      let selector = Object.assign({}, this);
      selector._new = false;
      return selector.pseudoElement(value);
    }
    this._pseudoElement = `::${value}`;
    return this;
  },

  combine(selector1, combinator, selector2) {
    if (this._new) {
      let selector = Object.assign({}, this);
      selector._new = false;
      return selector.combine(selector1, combinator, selector2);
    }
    this._combine = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this;
  }
};
