const algoliasearch = require('algoliasearch');

exports.handler = async function (event, context) {
  // Access your sensitive API key via process.env (not exposed to the frontend)
  const client = algoliasearch('UUJ4M67MVC', process.env.REACT_APP_ALGOLIA_API_KEY);
  const index = client.initIndex('products_index');

  // Extract query from the request (e.g., coming from the frontend)
  const query = event.queryStringParameters.query || '';

  try {
    // Perform Algolia search
    const result = await index.search(query);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error performing search' }),
    };
  }
};