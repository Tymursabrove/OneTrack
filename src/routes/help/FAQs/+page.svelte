<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { slide } from 'svelte/transition';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount } from 'svelte';
	import { data } from '$lib/resources/HelpCenterResources';
	import { Workspace } from '$lib/store';
	import { goto } from '$app/navigation';
	import type { FaqSection, FaqQuestion } from '$lib/types/Types';

	let faqs: FaqSection[] = [];

	onMount(async () => {
		Workspace.subscribe(async (ws) => {
			try {
				data.faq.forEach((x) => {
					faqs.push({
						category: x.category,
						questions: x.questions.map((y) => {
							var obj: FaqQuestion = {
								question: y.question,
								answer: y.answer,
								open: false
							};
							return obj;
						})
					});
				});
				faqs = faqs;
			} catch (err) {
			} finally {
				hideLoader();
			}
		});
	});
</script>

<svelte:head>
	<title>FAQs - OneTrack</title>
</svelte:head>

<main class="p-0 max-w-screen-xl mx-auto w-full flex-1 flex flex-col  xl:px-9">
	<div class="relative">
		<button
			on:click={() => {
				goto('/help');
			}}
			type="button"
			class="relative md:absolute top-0 left-0 inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-5 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
			><span class="relative z-10 leading-none inline-flex gap-2 items-center"
				><Icon data={Icons.AngleLeft} stroke="transparent" class="h-3 text-white shrink-0" />Back to
				Help Center</span
			></button
		>
		<!-- Content -->
		<div class="relative divide-y divide-grey space-y-10 py-5">
			<!-- Heading -->
			<div class="text-center space-y-5">
				<h2 class="text-xl sm:text-3xl xl:text-4xl font-semibold">Frequently Asked Questions</h2>

				<div class="relative w-full mx-auto max-w-sm flex items-center">
					<label for="keyword" class="sr-only">Search</label>
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
					>
						<input
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
							type="text"
							id="keyword"
							placeholder="Enter a question, topic or keyword"
						/>
					</div>
				</div>
			</div>

			<!-- FAQS Section -->
			<div class="space-y-14 pt-10">
				{#each faqs as faq}
					<div class="relative">
						<h2 class="text-left text-xl font-semibold tracking-tight sm:text-2xl">
							{faq.category}
						</h2>
						<dl class="space-y-6 divide-y divide-grey">
							{#each faq.questions as question}
								<div class="pt-6 first-of-type:pt-4">
									<dt class="text-xl">
										<button
											type="button"
											on:click={() => {
												question.open = !question.open;
											}}
											aria-expanded={question.open}
											class="flex w-full items-start justify-between text-left"
											aria-controls="faq-0"
										>
											<span class="font-medium ">{question.question}</span>
											<span class="ml-6 flex h-7 items-center shrink-0">
												<Icon
													data={Icons.AngleDown}
													stroke="transparent"
													class="h-3 text-grey-2 ease-in-out duration-300 {question.open
														? 'rotate-180'
														: ''}"
												/>
											</span>
										</button>
									</dt>
									{#if question.open}
										<dd class="mt-2 pr-12" transition:slide={{ duration: 300 }}>
											<p class="text-md font-light">
												{question.answer}
											</p>
										</dd>
									{/if}
								</div>
							{/each}
						</dl>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>
