const getSavedCartItems = () => localStorage.getItem('cartItems') || null;

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
