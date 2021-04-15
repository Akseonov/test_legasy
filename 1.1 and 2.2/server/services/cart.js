function _search(arr, id) {
  return arr.find(item => item.id === id);
}

module.exports = {
  /**
   * Добавить товар в корзину
   * @param cart - корзина
   * @param item - товар, который необходимо добавить
   * @return {*}
   */
  add(cart, item) {
    cart.contents.push(item);
    return cart;
  },

  /**
   * изменить количество товара в корзине
   * @param cart - корзина
   * @param id - номер товара
   * @param value - на сколько нужно изменить количество товара
   * @return {*}
   */
  change(cart, id, value) { //amount === 1/-1
    let find = _search(cart.contents, +id);
    find.amount += value;
    return cart;
  },
};
