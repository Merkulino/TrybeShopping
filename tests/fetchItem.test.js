const { fetchItem } = require('../helpers/fetchItem');

describe('2 - Teste a função fetchItem', () => {
  it('fetchItem is a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Calls fetch value', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('fetchItem function use the rigth endpoint on fetch', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  // Teste com um Mock que não foi criado por mim
  // it('return the rigth value', async () => {
  //   await expect(fetchItem('MLB1615760527')).resolves.toEqual(item);
  // });
  it('Should return error with no arguments in fetchItem function', async () => {
    const resolves = await fetchItem();
    expect(resolves).toEqual(new Error('You must provide an url'));
  });
});
