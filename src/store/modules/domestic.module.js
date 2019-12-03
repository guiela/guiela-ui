import axios from 'axios'

export default {
  state: {
			file: {
				header: [],
				records: [],
				meta: []
			}
  },

  mutations: {
		/**
		 * Update record
		 */
    updateDomestic: (state, data) => {
			state.file.header = data.header
			state.file.records = data.records
		},
    
    /**
     * Delete record.
     */
    deleteDomestic: (state, uuid) => {
      var index = state.file.records.findIndex(data => data.uuid === uuid);

      state.file.records.splice(index, 1);

      // Display an info toast with no title
      window.toastr.success('Domestic record removed!')
    },
    
  },

  actions: {

		/**
		 * 
		 * @param {*} param0 
		 * @param {*} file 
		 */
    async extractDomesticFileDataToArray({ commit }, file) {
      const response = await axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_CONVERT_API_URL, file, 
          {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {

				// Display an info toast with no title
        window.toastr.success('Domestic file content fetched and ready!')

        return response;
      })

      commit('updateDomestic', response.data)
    },

		/**
		 * 
		 * @param {*} param0 
		 * @param {*} data 
		 */
    updateDomestic({ commit }, data) {
      commit('updateDomestic', data)
    },

		/**
		 * 
		 * @param {*} param0 
		 * @param {*} uuid 
		 */
    deleteDomestic({ commit }, uuid) {
      commit('deleteDomestic', uuid)
    },
  },

  getters: {

		/**
		 * 
		 */
		getDomesticHeader: state => state.file.header,
		
		/**
		 * 
		 */
    getDomesticRecords: state => state.file.records
  }
}