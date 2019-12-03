<template>
  <div class="form-group">
    <label for="exampleInputEmail1" v-text="label"></label>
    <input type="file" @change="handleChange" class="form-control-file" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'domestic-file-input',
		props: ['label'],
		methods: {
			handleChange(event) {
				var files = event.target.files || event.dataTransfer.files;
				if (! files.length ) return;

				var form = new FormData();

				form.append('file', files[0]);

				this.extractDomesticFileDataToArray(form)

				this.$emit('fileSelected', files[0]);
			},

			...mapActions(['extractDomesticFileDataToArray'])
		}
	}
</script>
	
<style>

</style>