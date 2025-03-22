import axios from 'axios';
import './index.css';

export default {
  data() {
    return {
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
      lastParams: null,

      results: {
        data: [],
        total: 0,
        per_page: 10,
        current_page: 1
      },

      loading: false,
      noResults: false
    };
  },
  methods: {
    /**
     * @method search
     * @param {SubmitEvent|undefined} e 
     */
    async search(e) {
      this.loading = true;
      this.noResults = false;

      if (e) {
        this.searchParams.page = 1; // Update the page parameter
        this.lastParams = { ...this.searchParams };
      }

      // On real project we need to separate use ./js/api.js or sdk.js but it here for example
      try {
        const response = await axios.get('/api/housings/search', {
          params: this.lastParams,
        });

        this.results = response.data;
        this.noResults = this.results.data.length === 0;
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
      this.lastParams.page = page; // Update the page parameter
      this.search(); // Fetch data for the new page
    }
  }
};