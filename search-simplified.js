/* global instantsearch algoliasearch */

app({
  appId: 'JOYMYGJ401',
  apiKey: '09a82c94d83b9c76b1859b30a02c7327',
  indexName: 'prod_brennholz',
  searchParameters: {
    hitsPerPage: 10,
  },
});

function app(opts) {
  const search = instantsearch({
    searchClient: algoliasearch(opts.appId, opts.apiKey),
    indexName: opts.indexName,
    routing: true,
    searchFunction: opts.searchFunction,
  });

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search for products',
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    }),
    instantsearch.widgets.stats({
      container: '#stats',
    }),
    instantsearch.widgets.sortBy({
      container: '#sort-by',
      items: [
        {
          value: opts.indexName,
          label: 'Most relevant',
        },
        {
          value: `${opts.indexName}_price_asc`,
          label: 'Lowest price',
        },
        {
          value: `${opts.indexName}_price_desc`,
          label: 'Highest price',
        },
      ],
    }),
    instantsearch.widgets.pagination({
      container: '#pagination',
      scrollTo: '#search-input',
    }),
    instantsearch.widgets.refinementList({
      container: '#category',
      attribute: 'categories',
      operator: 'or',
      templates: {
        header: getHeader('Category'),
      },
    }),
    instantsearch.widgets.refinementList({
      container: '#brand',
      attribute: 'brand',
      operator: 'or',
      searchForFacetValues: {
        placeholder: 'Search for brands',
        templates: {
          noResults: '<div class="sffv_no-results">No matchings.</div>',
        },
      },
      templates: {
        header: getHeader('Brand'),
      },
    }),
    instantsearch.widgets.rangeSlider({
      container: '#price',
      attribute: 'Price',
      templates: {
        header: getHeader('Price'),
      },
    }),
    instantsearch.widgets.refinementList({
      container: '#type',
      attribute: 'Holzart',
      operator: 'and',
      templates: {
        header: getHeader('Type'),
      },
    }),
  ]);

  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}
