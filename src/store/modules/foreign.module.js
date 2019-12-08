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
    updateForeign: (state, data) => {
			state.file.header = data.header
			state.file.records = data.records
		},
    
    /**
     * Delete record.
     */
    deleteForeign: (state, uuid) => {
      var index = state.file.records.findIndex(data => data.uuid === uuid);

      state.file.records.splice(index, 1);

      // Display an info toast with no title
      window.toastr.success('Foreign record removed!')
    }
    
  },

  actions: {

		/**
		 * 
		 * @param {*} param0 
		 * @param {*} data 
		 */
    updateForeign({ commit }, data) {
      commit('updateForeign', data)
    },

		/**
		 * 
		 * @param {*} param0 
		 * @param {*} uuid 
		 */
    deleteForeign({ commit }, uuid) {
      commit('deleteForeign', uuid)
    }
  },

  getters: {

		/**
		 * Get foreign header
		 */
		getForeignHeader: state => state.file.header,
		
		/**
		 * Get foreign records
		 */
    getForeignRecords: state => state.file.records
  }
}