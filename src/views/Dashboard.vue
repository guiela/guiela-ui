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
							<a class="nav-link" data-toggle="tab" href="#profile"><i class="fas fa-wrench"></i> Preference</a>
						</li>
					</ul>

					<form @submit.prevent="onSubmit" enctype="multipart/form-data">
						<div id="myTabContent" class="tab-content pt-2">

							<div class="tab-pane fade show active" id="home">
								<div class="row">
									<div class="col-md-6">
										<div class="row">
											<div class="col-md-3">
												<div class="form-group">
													<label for="exampleFormControlSelect1">Delimiter</label>
													<select v-model="form.delimiter.domestic" class="custom-select custom-select-sm" id="exampleFormControlSelect1">
														<option value=";" selected>Semicolon ( ; )</option>
														<option value=",">Comma ( , )</option>
													</select>
													<small id="fileHelp" class="form-text text-muted">
														Select a delimeter.
													</small>
												</div>
											</div>
											<div class="col-md-8">
												<domestic-file-input @fileSelected="onDomesticFileSelected" label="Domestic File" :delimiter="form.delimiter.domestic"/>
											</div>
										</div>
									</div>

									<div class="col-md-6">
										<div class="row">
											<div class="col-md-3">
												<div class="form-group">
													<label for="exampleFormControlSelect1">Delimiter</label>
													<select v-model="form.delimiter.foreign" class="custom-select custom-select-sm" id="exampleFormControlSelect1">
														<option value=";" selected>Semicolon ( ; )</option>
														<option value=",">Comma ( , )</option>
													</select>
													<small id="fileHelp" class="form-text text-muted">
														Select a delimeter.
													</small>
												</div>
											</div>

											<div class="col-md-8">
												<foreign-file-input @fileSelected="onForeignFileSelected" label="Foreign File"  :delimiter="form.delimiter.foreign"/>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="tab-pane fade" id="profile">
								<div class="row">
									<div class="col-md-6">
										<div class="row">
											<div class="col">
												<label for="exampleInputFile">Identifier</label>
												<select v-if="getDomesticHeader && getForeignHeader" v-model="form.identifier" class="custom-select custom-select-sm">
														<option v-for="(header, index) in matchable" :value="header" v-text="header" :key="index"></option>
												</select>
												<select v-else class="custom-select custom-select-sm" disabled>
													<option selected>Open this select menu</option>
												</select>
												<small id="fileHelp" class="form-text text-muted">
													Select the column to be used to identify the row to be match and compared.
												</small>

												<label for="exampleInputFile">Matcher</label>
												<select v-if="getDomesticHeader && getForeignHeader" v-model="form.matcher" class="custom-select custom-select-sm">
													<option v-for="(header, index) in matchable" :value="header" v-text="header" v-bind:key="index"></option>
												</select>
												<select v-else class="custom-select custom-select-sm" disabled>
													<option selected>Open this select menu</option>
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
	import DomesticFileInput from '@/components/DomesticFileInput.vue'
	import ForeignFileInput from '@/components/ForeignFileInput.vue'
	import DataDisplay from '@/components/DataDisplay.vue'
	import { mapGetters, mapActions } from 'vuex'
	import axios from 'axios'

	export default {
		name: 'dashboard',
		data() {
			return {
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
			DomesticFileInput,
			ForeignFileInput,
			DataDisplay,
		},

		methods: {
			...mapActions(['updateDomestic', 'updateForeign']),

			onDomesticFileSelected(value) {
				this.form.domestic = value;
			},
			onForeignFileSelected(value) {
				this.form.foreign = value;
			},
			onSubmit() {
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

		computed: {

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
			},

			...mapGetters([
				'getDomesticHeader', 'getDomesticRecords',
				'getForeignHeader', 'getForeignRecords'
			])
		}
	}
</script>