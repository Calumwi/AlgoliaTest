const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'UUJ4M67MVC',
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const search = instantsearch({
  indexName: 'products_index',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.menuSelect({
    container: '#menu-select',
    attribute: 'categories',
    templates: {
      defaultOption: 'Sort by category',
    },
  }),
  instantsearch.widgets.menuSelect({
    container: '#menu-select2',
    attribute: 'price_range',
    templates: {
      defaultOption: 'Sort by price range',
    },
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <img src=${hit.image} alt=${hit.name} />
          <div>
            <h1>${components.Highlight({ hit, attribute: 'name'})}</h1>
            <p>$${components.Highlight({ hit, attribute: 'price'})}</p>
          </div>
        </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
