const search = instantsearch({
  indexName: 'products_index',
  searchClient: {
    search: async (requests) => {
      // Use the first query from the requests array
      const query = requests[0].params.query;

      // Call the serverless function instead of using the API key in the client
      const response = await fetch(`/.netlify/functions/algoliaSearch?query=${encodeURIComponent(query)}`);
      const result = await response.json();

      // Format the response to match Algolia's expected format
      return {
        results: [{
          hits: result.hits,
          nbHits: result.nbHits,
          page: result.page,
          nbPages: result.nbPages,
          hitsPerPage: result.hitsPerPage,
        }]
      };
    },
  },
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html }) => html`
        <article>
          <img src=${hit.image} alt=${hit.name} />
          <div>
            <h1>${hit.name}</h1>
            <p>$${hit.price}</p>
          </div>
        </article>
      `,
    },
  }),
]);

search.start();