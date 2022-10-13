const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Should call localStorage.getItem in getSavedCartItems', () => {
    getSavedCartItems(localStorageSimulator);
    expect(localStorage.getItem).toBeCalled();
  });
  it('Should call localStorage.getItem with the right param', () => {
    getSavedCartItems(localStorageSimulator);
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
