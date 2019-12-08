<template>
  <div class="form-group">
		<label :for="label+'Delimiter'">Delimiter</label>
		<select @change="handleChange" class="custom-select custom-select-sm" :id="label+'Delimiter'">
			<option selected>Select delimiter</option>
			<option value=";">Semicolon ( ; )</option>
			<option value=",">Comma ( , )</option>
		</select>
		<small id="fileHelp" class="form-text text-muted">
			Select a delimeter.
		</small>
	</div>
</template>

<script>
	export default {
		name: 'delimiter-input',
		props: ['label'],
		methods: {
			handleChange(event) {
				var value = event.target.value || event.dataTransfer.value;
				// if (! file.length ) return;

				this.$emit(this.label + '-delimiter-selected', value[0])
			}
		}
	}
</script>

<style>

</style>