<script lang="ts">
	let show = true;
</script>

{#if show}
	<div class="alert">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			class="closebtn"
			on:click={() => {
				show = false;
			}}>&times;</span
		>
		<strong>✅ Status Update ✅</strong><br /> Our systems are fully running again! This means you
		will be able to see your data in your dashboard again with an exception of all data collected
		from June 22nd until June 23rd 3pm CET.<br />
		We are working on replaying this data in our data base to make it available to you as soon as possible
		and will keep you posted on the current status. Thank you for your patience and understanding!
	</div>
{/if}

<style>
	.alert {
		padding: 20px;
		background-color: #00bf1b;
		color: white;
	}

	.closebtn {
		margin-left: 15px;
		color: white;
		font-weight: bold;
		float: right;
		font-size: 22px;
		line-height: 20px;
		cursor: pointer;
		transition: 0.3s;
	}

	.closebtn:hover {
		color: black;
	}
</style>
