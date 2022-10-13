const apiUrl = (endpoint) => `https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`;

const fetchProducts = async (endpoint) => {
  try {
    const response = await fetch(apiUrl(endpoint));
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error('You must provide an url'); 
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
