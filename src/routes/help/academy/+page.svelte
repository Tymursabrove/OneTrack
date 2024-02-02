<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import SelectionDropDown from '$lib/components/pages/helpAndSupport/SelectionDropDown.svelte';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount } from 'svelte';
	import { Workspace } from '$lib/store';
	import { goto } from '$app/navigation';
	import { showMessage } from '$lib/services/ToastService';
	const courses = [
		{
			tags: ['web', 'mobile'],
			heading: 'Basics of OneTrack - Coming Soon',
			subHeading: 'Introductory course for different aspects of OneTrack application and its use',
			lengthInMinutes: 120,
			totalModules: 20,
			completedModules: 0
		}
	];

	onMount(async () => {
		Workspace.subscribe(async (ws) => {
			try {
			} catch (err) {
			} finally {
				hideLoader();
			}
		});
	});
</script>

<svelte:head>
	<title>Academy - OneTrack</title>
</svelte:head>

<main class="p-0 max-w-screen-xl mx-auto w-full flex-1 flex flex-col  xl:px-9">
	<div class="relative">
		<button
			on:click={() => {
				goto('/help');
			}}
			type="button"
			class="relative sm:absolute top-0 left-0 inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-5 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
			><span class="relative z-10 leading-none inline-flex gap-2 items-center"
				><Icon data={Icons.AngleLeft} stroke="transparent" class="h-3 text-white shrink-0" />Back to
				Help Center</span
			></button
		>
		<!-- Content -->
		<div class="relative divide-y divide-grey space-y-10 py-5">
			<!-- Heading -->
			<div class="text-center">
				<h2 class="sm:text-lg xl:text-xl font-semibold ">Academy</h2>
				<h3 class="text-xl sm:text-3xl xl:text-4xl font-semibold">
					What do you want to learn today?
				</h3>
				<div class="max-w-sm mx-auto p-3 pb-0">
					<p class="text-sm">
						Our courses will step you through the process of a building small applications, or
						adding new features to existing applications.
					</p>
				</div>
			</div>

			<div class="space-y-7 pt-6">
				<div class="flex flex-col xs:flex-row gap-5">
					<div class="w-60">
						<SelectionDropDown
							id="academy-sort"
							title="All"
							list={[
								{
									id: 'all',
									state: false,
									name: 'All'
								},
								{ id: 'other', state: true, name: 'Other' }
							]}
							mainIcon={Icons.targetIcon}
							on:selectionChange={(e) => {}}
						/>
					</div>

					<div class="relative w-full sm:max-w-sm flex items-center">
						<label for="search" class="sr-only">Search</label>
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-10 hidden xs:flex items-center justify-center z-10"
							>
							<Icon data={Icons.searchIcon} stroke="transparent" class="w-4 h-4  text-white" />
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
							>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 xs:pl-10 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
								type="search"
								id="search"
								placeholder="Search by title or description"
								name="search"
							/>
						</div>
					</div>
				</div>

				<div
					class="flex flex-col xs:grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8"
				>
					{#each courses as course}
						<div
							class="outline-none bg-transparent relative p-5 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center  "
						>
							<div class="w-full flex flex-col relative z-10 space-y-5">
								<div class="space-y-5 flex-1">
									<div class="flex justify-between">
										<!-- category -->
										<div class="flex justify-start items-start gap-1 flex-wrap pt-1">
											{#if course.tags.find((x) => x == 'web')}
												<span
													class="rounded-full py-0.5 text-xs px-2 bg-blue-box inline-flex items-center"
													>Web</span
												>
											{/if}
											{#if course.tags.find((x) => x == 'mobile')}
												<span
													class="rounded-full py-0.5 text-xs px-2 bg-radial-green inline-flex items-center"
													>Mobile</span
												>
											{/if}
										</div>
										<!-- icons and progress -->
										<div class="shrink-0">
											{#if course.totalModules == course.completedModules}
												<Icon
													data={Icons.complete}
													stroke="transparent"
													class="w-7 h-7 text-blue "
												/>
											{:else}
												<div
													class="rounded-full w-7 h-7 relative after:border-blue after:border after:absolute after:inset-0 after:rounded-full overflow-hidden flex-col justify-end flex"
												>
													<div
														class="w-full bg-blue-box"
														style="height: {(course.completedModules / course.totalModules) *
															100}%;"
													/>
												</div>
											{/if}
										</div>
									</div>

									<div class="space-y-1">
										<h3 class="text-md font-medium text-white">{course.heading}</h3>
										<p class="text-sm text-white">
											{course.subHeading}
										</p>
									</div>
									<hr class="w-20 border-b border-grey border-0" />
									<ul class="space-y-1.5 text-sm text-grey-2">
										<li class="flex gap-2 items-center">
											<span class="shirink-0"
												><Icon data={Icons.clockIcon} stroke="transparent" class="w-4 h-4 " /></span
											>
											<span>{course.lengthInMinutes} minutes</span>
										</li>
										{#if course.totalModules == course.completedModules}
											<li class="flex gap-2 items-center">
												<span class="shirink-0"
													><Icon
														data={Icons.checkbox}
														stroke="transparent"
														class="w-4 h-4 "
													/></span
												>
												<span>Completed</span>
											</li>
										{:else}
											<li class="flex gap-2 items-center">
												<span class="shirink-0"
													><Icon
														data={Icons.checkboxBlank}
														stroke="transparent"
														class="w-4 h-4 "
													/></span
												>
												<span>In progress</span>
											</li>
										{/if}
									</ul>
								</div>
								<div class="flex justify-end">
									<button
										on:click={() => {
											showMessage('This course will be available soon.', '', 'info');
										}}
										type="button"
										class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-blue hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-blue after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
										><span class="relative z-10 leading-none">Continue</span></button
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>
