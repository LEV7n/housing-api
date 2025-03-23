import axios from 'axios';
import './index.css';

/**
 * @typedef {Object} searchParams
 * @prop {String} name
 * @prop {Number|null} bedrooms
 * @prop {Number|null} bathrooms
 * @prop {Number|null} storeys
 * @prop {Number|null} garages
 * @prop {Number|null} price_min
 * @prop {Number|null} price_max
 * @prop {Number} page
 */

/**
 * @typedef {Object} results
 * @prop {Array} data
 * @prop {Number} total
 * @prop {Number} per_page
 * @prop {Number} current_page
 */

export default {
  data() {
    return {
      /** @type {searchParams} */
      searchParams: {
        name: '',
        bedrooms: null,
        bathrooms: null,
        storeys: null,
        garages: null,
        price_min: null,
        price_max: null,
        page: 1
      },

      /** @type {searchParams|null} */
      lastParams: null,

      /** @type {results} */
      results: {
        data: [],
        total: 0,
        per_page: 10,
        current_page: 1
      },

      /** @type {Boolean} */
      loading: false,
      /** @type {Boolean} */
      noResults: false
    };
  },
  methods: {
    /**
     * @method formatPrice
     * @param {Object} row
     * @param {Object} column
     * @param {Number} cellValue
     * @returns {String}
     */
    formatPrice(row, column, cellValue) {
      const
        /** @type {NumberFormat} */
        formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        });

        return formatter.format(cellValue);
    },

    /**
     * @method search
     * @param {SubmitEvent|undefined} e 
     */
    async search(e) {
      this.loading = true;
      this.noResults = false;

      if (e) {
        /* Update the page parameter */
        this.searchParams.page = 1;
        this.lastParams = { ...this.searchParams };
      }

      /**
       * On real project we need to separate use ./js/api.js or sdk.js but it here for example
       * also instead of css use sass, less
       */
      try {
        const
          /** @type {results} */
          response = await axios.get('/api/housings/search', {
            params: this.lastParams
          });

        this.results = response.data;
        this.noResults = !this.results?.data?.length;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * @method handlePageChange
     * @param {Number} page
     */
    handlePageChange(page) {
      /* Update the page parameter */
      this.lastParams.page = page;

      /* Fetch data for the new page */
      this.search();
    }
  }
};