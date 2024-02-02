<script>
	export let heading = 'This feature is coming soon.';
	export let details = 'Our team is currently working on this page. Please come back later.';
</script>

<main class="p-0 max-w-screen-xl mx-auto w-full flex-1 flex flex-col justify-center xl:px-9">
	<div class=" py-5 xl:px-14">
		<div class="xl:space-y-20 space-y-10">
			<!-- Heading -->
			<div class="space-y-2 text-center">
				<h2 class="text-lg xs:text-xl md:text-2xl xl:text-3xl font-semibold ">
					{heading}
				</h2>
				<p class="text-sm text-grey-2 font-semibold">
					{details}
				</p>
			</div>
			<img src="/images/construction.png" alt="" class="w-full max-w-xl mx-auto" />
		</div>
	</div>
</main>
