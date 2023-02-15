<script lang="ts">
	export let src: string
</script>

<style lang="scss">

.crop
{
	width: 100%;
	height: 100%;

	background-size: cover;
}

</style>

<div class="crop" style:background-image={`url('${src}')`}>
</div>
