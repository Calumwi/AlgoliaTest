const algoliasearch = require('algoliasearch');

exports.handler = async function (event, context) {
  const client = algoliasearch('UUJ4M67MVC', process.env.REACT_APP_ALGOLIA_API_KEY);
  const index = client.initIndex('products_index');

  const query = event.queryStringParameters.query || '';

  try {
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