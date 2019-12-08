<template>
  <div class="form-group">
    <label for="exampleInputEmail1" v-text="label"></label>
    <input :disabled="checkDelimiter" type="file" @change="handleChange" :class="inputClasses" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div v-if="error" class="invalid-feedback" v-text="error"></div>
		<small v-else id="emailHelp" class="form-text text-muted">Select a csv file.</small>
  </div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'file-input',

		props: ['label', 'delimiter', 'name'],

		data() {
			return {
				error: null
			}
		},

		methods: {

			handleChange(event) {

				// Clear errors.
				this.error = null

				var files = event.target.files || event.dataTransfer.files;
				if (! files.length ) return;

				var form = new FormData();

				form.append('file', files[0]);
				form.append('delimiter', this.delimiter);

				axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_CONVERT_API_URL, form, 
						{headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {

					this.$store.commit(`update${this.name}`, response.data)

					// Display an info toast with no title
					window.toastr.success(this.name+' file content fetched and ready!')
					
				}).catch((error) => {
					this.$emit('file-error', this.name + ': ' + error.response.data.errors.file[0])

					this.error = error.response.data.errors.file[0]

				})

				this.$emit('fileSelected', files[0]);
			}
		},

		computed: {

			checkDelimiter() {
				if (this.delimiter === ',' || this.delimiter === ';') {
					return false;
				}

				return true;
			},

			inputClasses() {
				if (this.error) {
					return 'form-control-file is-invalid'
				}

				return 'form-control-file'
			}
		}
	}
</script>
	
<style>

</style>