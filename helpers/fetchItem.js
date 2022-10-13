const apiURL = (endpoint) => `https://api.mercadolibre.com/items/${endpoint}`;

const fetchItem = async (endpoint) => {
  try {
    const response = await fetch(apiURL(endpoint));
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
