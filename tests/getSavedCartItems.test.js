const getSavedCartItems = require('../helpers/getSavedCartItems');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Should call localStorage.getItem in getSavedCartItems', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  it('Should call localStorage.getItem with the right param', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
