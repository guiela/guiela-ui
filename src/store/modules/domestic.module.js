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
    }
    
  },

  actions: {

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
		}
  },

  getters: {

		/**
		 * Get domestic header
		 */
		getDomesticHeader: state => state.file.header,
		
		/**
		 * Get domestic records
		 */
		getDomesticRecords: state => state.file.records
  }
}