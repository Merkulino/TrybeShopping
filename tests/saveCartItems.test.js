const saveCartItems = require('../helpers/saveCartItems');

describe('3 - Teste a função saveCartItems', () => {
  it('Should call the method localStorage.setItem when execute saveCartItems', () => {
    saveCartItems();
    expect(localStorage.setItem).toBeCalled();
  });
  it('Should call the method localStorage.setItem with the right params', () => {
    saveCartItems('localStorageSimulator');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'localStorageSimulator');
  });
});
