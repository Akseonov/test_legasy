function _search(arr, id) {
  return arr.find(item => item.id === id);
}

module.exports = {
  add(cart, item) {
    cart.contents.push(item);
    return cart;
  },

  change(cart, id, value) { //amount === 1/-1
    let find = _search(cart.contents, +id);
    find.amount += value;
    return cart;
  },
};
