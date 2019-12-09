<template>
  <div class="dashboard">
		<section class="container-fluid mt-3">
			<div class="row">
				<div class="col-12">
					<ul class="nav nav-tabs">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="tab" href="#home"><i class="fas fa-upload"></i> Upload</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#profile"><i class="fas fa-filter"></i> Constraints</a>
						</li>
					</ul>

					<b-alert v-if="errors.length >= 1" variant="warning" show dismissible>
						<ol>
							<li v-for="(error, index) in errors" v-text="error" :key="`error-${index}`"></li>
						</ol>
					</b-alert>

					<form @submit.prevent="onSubmit" enctype="multipart/form-data">
						<div id="myTabContent" class="tab-content pt-2">

							<div class="tab-pane fade show active" id="home">
								<div class="row">
									<div class="col-md-6">
										<file-input
											@domestic-delimiter-selected="onDomesticDelimiter" 
											@fileSelected="onDomesticFileSelected" 
											@file-error="this.onFileError"
											label="Domestic File" 
											name="Domestic" />
									</div>

									<div class="col-md-6">
										<file-input 
											@foreign-delimiter-selected="onForeignDelimiter"
											@fileSelected="onForeignFileSelected"  
											@file-error="this.onFileError"
											label="Foreign File" 
											name="Foreign" />
									</div>
								</div>
							</div>

							<div class="tab-pane fade" id="profile">
								<div class="row">
									<div class="col-md-6">
										<div class="row">
											<div class="col">
												<label for="exampleInputFile">Identifier</label>
												<select :disabled="getDomesticHeader.length < 1 && getForeignHeader.length < 1" v-model="form.identifier" class="custom-select custom-select-sm">
													<option selected>Open this select menu</option>
													<option v-for="(header, index) in matchable" :value="header" v-text="header" :key="index"></option>
												</select>
												<small id="fileHelp" class="form-text text-muted">
													Select the column to be used to identify the row to be matched and compared.
												</small>

												<label for="exampleInputFile">Matcher</label>
												<select :disabled="getDomesticHeader.length < 1 && getForeignHeader.length < 1" v-model="form.matcher" class="custom-select custom-select-sm">
													<option selected>Open this select menu</option>
													<option v-for="(header, index) in matchable" :value="header" v-text="header" v-bind:key="index"></option>
												</select>
												<small id="fileHelp" class="form-text text-muted">
													Select the column to be compared.
												</small>
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<div class="row">
											<div class="col">
												<div class="custom-control custom-checkbox">
													<input v-model="form.sum" type="checkbox" class="custom-control-input" id="sum">
													<label class="custom-control-label" for="sum"><i class="fas fa-plus-square"></i> Sum</label>
												</div>
												<small id="fileHelp" class="form-text text-muted">
														Sum up all the values in the matched column. <br/>
														<span class="text-warning">
															<strong>Warning!</strong> <br /> Please note that when you select this checkbox the column selected to be matched will be treated as an integer value when trying to return a sum of all its values. If the entire column does not contain <strong>ONLY</strong> integer values, that might cause the application to return an incorrect result.
														</span>
												</small>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<button class="btn btn-sm btn-success mt-3" :disabled="false"><i class="fas fa-paper-plane"></i> Submit</button>
					</form>

					<hr />
				</div>
			</div>
		</section>

		<data-display 
			:domestic="{ headers: getDomesticHeader, records: getDomesticRecords }" 
			:foreign="{ headers: getForeignHeader, records: getForeignRecords }"/>
  </div>
</template>

<script>
	// @ is an alias to /src
	import FileInput from '@/components/FileInput.vue'
	import DataDisplay from '@/components/DataDisplay.vue'
	import { mapGetters, mapActions } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'dashboard',
		data() {
			return {
				errors: [],

				form: {
					domestic: null,
					foreign: null,
					identifier: null,
					matcher: null,
					sum: false,
					delimiter: {
						domestic: null,
						foreign: null
					}
				}
			}
		},

		components: {
			// Import DomesticFileInput component.
			FileInput,
			// Import DataDisplay component.
			DataDisplay
		},

		methods: {
			// Import actions from vuex.
			...mapActions(['updateDomestic', 'updateForeign']),

			/**
			 * Respond to the onForeignFileSelected
			 * event and assign it's value to the form
			 * domestic property.
			 * 
			 * @param mixed value
			 */
			onDomesticFileSelected(value) {
				this.form.domestic = value;
			},

			/**
			 * Respond to the onDomesticFileSelected
			 * event and assign it's value to the form
			 * foreign property.
			 * 
			 * @param mixed value
			 */
			onForeignFileSelected(value) {
				this.form.foreign = value;
			},

			/**
			 * Respond to the domestic-delimiter-selected
			 * event and assign it's value to the form
			 * delimiter domestic property.
			 * 
			 * @param mixed value
			 */
			onDomesticDelimiter(value) {
				this.form.delimiter.domestic = value
			},

			/**
			 * Respond to the foreign-delimiter-selected
			 * event and assign it's value to the form
			 * delimiter foreign property.
			 * 
			 * @param mixed value
			 */
			onForeignDelimiter(value) {
				this.form.delimiter.foreign = value
			},

			onFileError(value) {
				this.errors.push(value)
			},

			/**
			 * Submit form
			 * 
			 * This function is called when the submit button is pressed.
			 */
			onSubmit() {
				this.validate()

				if (this.errors.length < 1) {
					// Reset errors
					this.errors = []

					// Display an info toast with no title
					window.toastr.info('Submitting data for processing!')

					const data = new FormData();

					data.append('domestic', this.form.domestic);
					data.append('foreign', this.form.foreign);
					data.append('identifier', this.form.identifier);
					data.append('matcher', this.form.matcher);
					data.append('sum', this.form.sum);
					data.append('delimiter', this.form.delimiter);

					axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_PROCESS_API_URL, data,
						{headers: {'Content-Type': 'multipart/form-data'}})
						.then((response) => {
							this.updateDomestic(response.data.domestic);
							this.updateForeign(response.data.foreign);

							// Display an info toast with no title
							window.toastr.success('Processing complete!', 'Success')
						});
				}
			},

			validate() {
				this.errors = []

				// Make sure domestic field is not null.
				if (! this.form.domestic){
					this.errors.push('The domestic field is required.')
				}

				// Make sure foreign field is not null.
				if (! this.form.foreign){
					this.errors.push('The foreign field is required.')
				}

				// Make sure identifier field is not null.
				if (! this.form.identifier){
					this.errors.push('The identifier field is required.')
				}

				// Make sure Matcher field is not null.
				if (! this.form.matcher){
					this.errors.push('The matcher field is required.')
				}

				// Make sure domestic delimiter field is not null.
				if (! this.form.delimiter.domestic){
					this.errors.push('The delimiter for domestic field input is required.')
				}

				// Make sure foreign delimiter field is not null.
				if (! this.form.delimiter.foreign){
					this.errors.push('The delimiter for foreign field input is required.')
				}
			}
		},

		computed: {
			// Import vuex getters.
			...mapGetters([
				'getDomesticHeader', 'getDomesticRecords',
				'getForeignHeader', 'getForeignRecords'
			]),

			/**
			 * This filters through the headers and return the 
			 * values that are present in both headers.
			 * 
			 * @returns array
			 */
			matchable() {
				var arr=[];
				
				for(var a = 0; a <= this.getDomesticHeader.length; a++) {
					for(var b = 0; b <= this.getForeignHeader.length; b++) {
						if ((this.getDomesticHeader[a] === this.getForeignHeader[b]) 
							&& (typeof this.getDomesticHeader[a] === 'string') 
							&& (typeof this.getForeignHeader[b] === 'string')) {
							
							arr = [...arr, this.getDomesticHeader[a]];
							continue;
						}
					}
				}

				return arr;
			}
		}
	}
</script>

<style scoped>
	.alert {
		margin-top: 6px;
		border-radius: 0;
	}
</style>