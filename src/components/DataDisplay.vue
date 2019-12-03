<template>
  <section class="container-fluid mt-3">

		<div class="row">
			<div class="col-md-6">
				<h2>Results</h2>
			</div>

			<div class="col-md-6">
				<div class="d-flex justify-content-end">
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="grid-view" value="grid" v-model="layout" class="custom-control-input" checked>
						<label class="custom-control-label" for="grid-view"><i class="fas fa-th-large" title="Grid view"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="stacked-view" value="stacked" v-model="layout" class="custom-control-input">
						<label class="custom-control-label" for="stacked-view"><i class="fas fa-bars" title="Stacked view"></i></label>
					</div>
				</div>
			</div>
		</div>

		<section class="row mt-3">
			<div :class="layoutClasses" :style="layoutStyle">
				<table-data :headers="domestic.headers" @delete-row="this.deleteDomestic" :records="domestic.records" :width="layoutStyle"/>
			</div>
			<div :class="layoutClasses" :style="layoutStyle">
				<table-data :headers="foreign.headers" @delete-row="this.deleteForeign" :records="foreign.records" :width="layoutStyle"/>
			</div>
		</section>
	</section>
</template>

<script>
	import TableData from './TableData.vue'
	import { mapActions } from 'vuex'

	export default {
		name: 'data-display',
		props: ['domestic', 'foreign'],
		data() {
			return {
				layout: 'grid'
			}
		},
		components: {
			TableData
		},
		methods: {
			...mapActions(['deleteDomestic', 'deleteForeign'])
		},
		computed: {
			layoutClasses: function() {
				if (this.layout === 'stacked') return 'col-sm-12 col-md-12 col-lg-12 mb-3';
				return 'col-sm-6 col-md-6 col-lg-6 mb-3';
			},
			layoutStyle: function() {
				if (this.layout === 'stacked') return 'height: 450px';
				return '600px';
			},
		}
	}
</script>

<style>

</style>