<template>
	<div class="table-responsive" :style="width">
		<table class="table table-hover table-bordered table-sm">
			<thead class="thead-dark">
				<tr>
					<th scope="col" style="width: 5%">#</th>
					<th v-for="(header, index) in headers" :key="index" v-text="header"></th>
				</tr>
			</thead>
			<tbody class="bg-white">
				<tr v-for="(record, index) in records" :class="record.hasOwnProperty('meta_data') ? record.meta_data.classes : null" :key="record.uuid">
					<th scope="row" v-text="(index + 1)"></th>
					<td v-for="(item, index) in record.data" :key="index" v-text="item"></td>

					<td style="width: 12px" v-if="record.hasOwnProperty('meta_data')">
						<b-button size="sm" @click="$bvModal.show(record.uuid)"><i class="fas fa-chart-bar"></i></b-button>

						<b-modal size="xl" :id="record.uuid" title="Matching Row">
							<table class="table table-hover table-bordered table-sm">
								<thead class="thead-dark">
									<tr>
										<th scope="col" style="width: 5%">#</th>
										<th v-for="(header, index) in record.meta_data.matching_row.header" :key="index">
											<div class="custom-control custom-checkbox custom-control-inline">
												<input type="checkbox" :id="header" :name="header" class="custom-control-input" checked>
												<label class="custom-control-label" :for="header" v-text="header"></label>
											</div>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white">
									<tr>
										<th scope="row" v-text="1"></th>
										<td v-for="(item, index) in record.meta_data.matching_row.records.data" :key="index">
											<span v-if="typeof item === 'string'">
											{{ item }}
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</b-modal>
					</td>
					<td style="width: 12px">
						<button class="btn btn-danger btn-sm" @click="$emit('delete-row', record.uuid)"><i class="fas fa-times"></i></button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

	export default {
		name: 'table-data',
		props: ['headers', 'records', 'width'],
	}
</script>

<style>

</style>