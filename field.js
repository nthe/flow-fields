/**
 * Matrix.
 * @param {number} cols - number of columns
 * @param {number} rows - number of rows
 * @param {any} initialValue - initial value
 * @returns {object} matrix
 */
const Matrix = (cols, rows, initialValue = 1) => {
  const elements = cols * rows;
  const field = new Array(elements).fill(initialValue);

  const colSize = width / cols;
  const rowSize = height / rows;
  const colPad = colSize / 2;
  const rowPad = rowSize / 2;

  /**
   * Get element at coordinates.
   * @param {number} row
   * @param {number} col
   * @returns {object}
   */
  const elementAt = (row, col) => ({
    row,
    col,
    pos: {
      x: colSize * col + colPad,
      y: rowSize * row + rowPad,
    },
    val: field[col * rows + row],
  });

  /**
   * Get element at index.
   * @param {number} index
   * @returns {object}
   */
  const getIndex = index => elementAt(Math.floor(index / cols), index % cols);

  /**
   * Yield all elements.
   * @yields {object} element
   */
  const iterator = function*() {
    let n = field.length;
    while (n--) {
      yield getIndex(n);
    }
  };

  /**
   * Default render function for flow-field.
   * @param {object} e - element
   */
  const _render = e => {
    line(e.pos.x - 2, e.pos.y - 4, e.pos.x + 2, e.pos.y);
    line(e.pos.x - 2, e.pos.y + 4, e.pos.x + 2, e.pos.y);
  };

  /**
   * Overridable render function for flow-field.
   * @param {function} func
   */
  const render = func => {
    for (let e of iterator()) {
      if (func) {
        func(e);
      } else {
        _render(e);
      }
    }
  };

  /**
   * Fill field using function.
   * @param {function} func
   */
  const fill = func => {
    let n = field.length;
    while (n--) {
      field[n] = func(Math.floor(n / cols), n % cols, field.length - n);
    }
  };

  /**
   * Lookup nearest vector based on position vector.
   * @param {Vector} pos
   * @returns {object} element
   */
  const seek = pos => elementAt(Math.floor(pos.x / colSize), Math.floor(pos.y / rowSize));

  return {
    cols,
    rows,
    values: field,
    length: field.length,
    get: elementAt,
    getIndex,
    set: (row, col, val) => (field[col * rows + row] = val),
    iterator,
    render,
    fill,
    seek,
  };
};
