<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	const id = 'event-type-toggle-selection-dropdown';
	const title = 'Admin';
	let list = [
		{ id: 'billing', state: true, name: 'Billing' },
		{ id: 'manager', state: false, name: 'Manager' },
		{ id: 'analyst', state: false, name: 'Analyst' }
	];

	let showDropdown = false;
	function handleClick(id) {
		for (let item of list) {
			item.state = false;
		}
		list.find((x) => x.id == id).state = true;
		dispatch('selectionChange', { isPurchaseSelected: list.find((x) => x.id == 'admin').state });
		list = list;
	}

	let showDropdownPartner = false;
	function handleClick2(id) {
		for (let item of list) {
			item.state = false;
		}
		list.find((x) => x.id == id).state = true;
		dispatch('selectionChange', { isPurchaseSelected: list.find((x) => x.id == 'admin').state });
		list = list;
	}
</script>

<div class="space-y-12 pb-5">
	<!-- Workspace -->
	<div class="space-y-8 ">
		<div class="space-y-5">
			<h1 class="text-2xl font-bold text-white">Workspaces</h1>
		</div>

		<div class="relative">
			<label class="block text-sm font-semibold text-white sr-only" for="email">Add workspace</label
			>
			<div class="mt-1 relative">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
				>
					<Icon
						data={Icons.threeCustomersSymbolIcon}
						stroke="transparent"
						class="w-5 h-5  text-white"
					/>
				</div>
				<div class="flex gap-2">
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
					>
						<input
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
							type="email"
							id="email"
							placeholder="Enter workspace ID"
							name="email"
						/>
					</div>

					<button
						type="button"
						class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-20 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
						><span class="relative z-10 leading-none">Add</span></button
					>
				</div>
			</div>
		</div>

		<div
			class=" relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 border border-blue flex items-center py-5 px-6 after:absolute after:inset-0 after:rounded-3xl hover:after:shadow-glow-blue after:ease-in-out after:duration-500  hover:before:opacity-80"
		>
			<div
				class="flex justify-between flex-wrap items-center gap-3 lg:gap-x-5 2xl:gap-x-10 flex-1 relative z-10"
			>
				<div class="flex items-center gap-x-5 xl:pl-5">
					<div class="h-12 w-12 flex justify-center items-center">
						<Icon data={Icons.avatar} class="object-cover aspect-square" />
					</div>

					<div class="space-y-1">
						<h3 class="block text-sm font-semibold text-white">Workspace 1</h3>
						<p class="text-sm leading-none text-grey-2">partneragency@mail.ca</p>
					</div>
				</div>
				<div class="flex items-center">
					<button
						type="button"
						class="bg-transparent relative text-red after:bg-radial-red hover:text-white rounded-full flex items-center justify-center border-0 w-8 h-8 after:ease-in-out after:duration-500 ease-in-out duration-500 after:absolute after:inset-0 after:rounded-full after:opacity-0 hover:after:opacity-100 hover:shadow-glow-red"
					>
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-4 h-4 relative z-10 " />
					</button>
				</div>
			</div>
		</div>

		<div class="gap-4 flex justify-end">
			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				><span class="relative z-10 leading-none">Cancel</span></button
			>

			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
				><span class="relative z-10 leading-none">Save</span></button
			>
		</div>
	</div>
	<!-- Team -->
	<div class="space-y-8 ">
		<div class="space-y-5">
			<h1 class="text-2xl font-bold text-white ">Team</h1>
		</div>

		<div class="relative">
			<label class="block text-sm font-semibold text-white sr-only" for="email"
				>Add team members</label
			>
			<div class="mt-1 relative">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
				>
					<Icon
						data={Icons.threeCustomersSymbolIcon}
						stroke="transparent"
						class="w-5 h-5  text-white"
					/>
				</div>
				<div class="flex gap-2">
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
					>
						<input
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
							type="email"
							id="email"
							placeholder="Enter e-mail address"
							name="email"
						/>
					</div>

					<button
						type="button"
						class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-20 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
						><span class="relative z-10 leading-none">Add</span></button
					>
				</div>
			</div>
		</div>

		<div
			class=" relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 border border-blue flex items-center py-5 px-6 after:absolute after:inset-0 after:rounded-3xl hover:after:shadow-glow-blue after:ease-in-out after:duration-500  hover:before:opacity-80 z-20"
		>
			<div
				class="flex justify-between flex-wrap items-center gap-3 lg:gap-x-5 2xl:gap-x-10 flex-1 relative z-10"
			>
				<div class="flex items-center gap-x-5 xl:pl-5">
					<div class="h-12 w-12 flex justify-center items-center">
						<Icon data={Icons.avatar} class="object-cover aspect-square" />
					</div>
					<div class="space-y-1">
						<h3 class="block text-sm font-semibold text-white">Dejesus Michael</h3>
						<p class="text-sm leading-none text-grey-2">dejesusmichael@mail.org</p>
					</div>
				</div>

				<div class="flex gap-4">
					<div class="relative w-32 ">
						<button
							type="button"
							class="py-2.5 px-4  cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 before:ease-in-out before:duration-300 z-20 before:rounded-md before:absolute before:inset-0 text-sm text-white  {showDropdown
								? 'before:shadow-glow-blue before:bg-blue-box'
								: 'before:shadow-glass-2 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl'}"
							aria-haspopup="listbox"
							aria-expanded="true"
							aria-labelledby="listbox-label"
							on:click|stopPropagation={() => {
								showDropdown = !showDropdown;
							}}
							{id}
						>
							<span class="block truncate z-10">{title}</span>
							<span
								class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 z-10"
							>
								<Icon
									data={Icons.triangleSymbolIcon}
									class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
									color="currentColor"
								/>
							</span>
						</button>

						{#if showDropdown}
							<div
								transition:slide
								class="absolute mt-2 left-0 z-10 max-h-60 w-full top-full overflow-auto rounded-md bg-color  focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-dropdown before:opacity-60 before:inset-0"
								tabindex="-1"
								role="listbox"
								aria-labelledby="listbox-label"
								aria-activedescendant="listbox-option-3"
							>
								<ul
									class="relative z-10 divide-y divide-grey"
									id="{id}-drop-wrapper"
									use:clickOutside
									on:click_outside={() => {
										if (showDropdown) {
											showDropdown = false;
										}
									}}
								>
									{#if list}
										{#each list as item (item.id)}
											<li
												class="text-white relative group cursor-default select-none flex items-center py-3 px-4 gap-2 hover:bg-grey/10 transitions border-y border-transparent hover:border-grey/20"
											>
												<span>{item.name}</span>
												<button
													class="absolute inset-0 z-10"
													on:click|stopPropagation={async () => {
														showDropdown = false;
														handleClick(item.id);
													}}><span class="sr-only">toggle</span></button
												>
											</li>
										{/each}
									{/if}
								</ul>
							</div>
						{/if}
					</div>
					<!-- Close button on Dekyop -->
					<div class="hiiden md:flex items-center">
						<button
							type="button"
							class="bg-transparent relative text-red after:bg-radial-red hover:text-white rounded-full flex items-center justify-center border-0 w-8 h-8 after:ease-in-out after:duration-500 ease-in-out duration-500 after:absolute after:inset-0 after:rounded-full after:opacity-0 hover:after:opacity-100 hover:shadow-glow-red"
						>
							<Icon data={Icons.crossIcon} stroke="transparent" class="w-4 h-4 relative z-10 " />
						</button>
					</div>
				</div>
				<!-- Close button on Mobile -->
				<div class="flex md:hidden items-center">
					<button
						type="button"
						class="bg-transparent relative text-red after:bg-radial-red hover:text-white rounded-full flex items-center justify-center border-0 w-8 h-8 after:ease-in-out after:duration-500 ease-in-out duration-500 after:absolute after:inset-0 after:rounded-full after:opacity-0 hover:after:opacity-100 hover:shadow-glow-red"
					>
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-4 h-4 relative z-10 " />
					</button>
				</div>
			</div>
		</div>

		<div class="gap-4 flex justify-end">
			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				><span class="relative z-10 leading-none">Cancel</span></button
			>

			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
				><span class="relative z-10 leading-none">Save</span></button
			>
		</div>
	</div>
	<!-- Partner -->
	<div class="space-y-8 ">
		<div class="space-y-5">
			<h1 class="text-2xl font-bold text-white ">Partner</h1>
		</div>

		<div class="relative">
			<label class="block text-sm font-semibold text-white sr-only" for="workspaceID"
				>Add workspace</label
			>
			<div class="mt-1 relative">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
				>
					<Icon
						data={Icons.threeCustomersSymbolIcon}
						stroke="transparent"
						class="w-5 h-5 text-white"
					/>
				</div>
				<div class="flex gap-2">
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
					>
						<input
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
							type="email"
							id="workspaceID"
							placeholder="Enter workspace ID"
							name="email"
						/>
					</div>

					<button
						type="button"
						class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-20 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
						><span class="relative z-10 leading-none">Add</span></button
					>
				</div>
			</div>
		</div>

		<div
			class=" relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 border border-blue flex items-center py-5 px-6 after:absolute after:inset-0 after:rounded-3xl hover:after:shadow-glow-blue after:ease-in-out after:duration-500  hover:before:opacity-80 z-20"
		>
			<div
				class="flex justify-between flex-wrap items-center gap-3 lg:gap-x-5 2xl:gap-x-10 flex-1 relative z-10"
			>
				<div class="flex items-center gap-x-5 xl:pl-5">
					<div class="h-12 w-12 flex justify-center items-center">
						<Icon data={Icons.avatar} class="object-cover aspect-square" />
					</div>
					<div class="space-y-1">
						<h3 class="block text-sm font-semibold text-white">Dejesus Michael</h3>
						<p class="text-sm leading-none text-grey-2">dejesusmichael@mail.org</p>
					</div>
				</div>

				<div class="flex gap-4">
					<div class="relative w-32 ">
						<button
							type="button"
							class="py-2.5 px-4  cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 before:ease-in-out before:duration-300 z-20 before:rounded-md before:absolute before:inset-0 text-sm text-white  {showDropdownPartner
								? 'before:shadow-glow-blue before:bg-blue-box'
								: 'before:shadow-glass-2 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl'}"
							aria-haspopup="listbox"
							aria-expanded="true"
							aria-labelledby="listbox-label"
							on:click|stopPropagation={() => {
								showDropdownPartner = !showDropdownPartner;
							}}
							{id}
						>
							<span class="block truncate relative z-10">{title}</span>
							<span
								class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 z-10"
							>
								<Icon
									data={Icons.triangleSymbolIcon}
									stroke="transparent"
									class="w-2.5 h-2.5 transitions {showDropdownPartner ? 'rotate-180' : ''}"
									color="currentColor"
								/>
							</span>
						</button>

						{#if showDropdownPartner}
							<div
								transition:slide
								class="absolute mt-2 left-0 z-10 max-h-60 w-full top-full overflow-auto rounded-md bg-color  focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-dropdown before:opacity-60 before:inset-0"
								tabindex="-1"
								role="listbox"
								aria-labelledby="listbox-label"
								aria-activedescendant="listbox-option-3"
							>
								<ul
									class="relative z-10 divide-y divide-grey"
									id="{id}-drop-wrappers"
									use:clickOutside
									on:click_outside={() => {
										if (showDropdownPartner) {
											showDropdownPartner = false;
										}
									}}
								>
									{#if list}
										{#each list as item (item.id)}
											<li
												class="text-white relative group cursor-default select-none flex items-center py-3 px-4 gap-2 hover:bg-grey/10 transitions border-y border-transparent hover:border-grey/20"
											>
												<span>{item.name}</span>
												<button
													class="absolute inset-0 z-10"
													on:click|stopPropagation={async () => {
														showDropdownPartner = false;
														handleClick2(item.id);
													}}><span class="sr-only">toggle</span></button
												>
											</li>
										{/each}
									{/if}
								</ul>
							</div>
						{/if}
					</div>
					<!-- Close button on Dekyop -->
					<div class="hiiden md:flex items-center">
						<button
							type="button"
							class="bg-transparent relative text-red after:bg-radial-red hover:text-white rounded-full flex items-center justify-center border-0 w-8 h-8 after:ease-in-out after:duration-500 ease-in-out duration-500 after:absolute after:inset-0 after:rounded-full after:opacity-0 hover:after:opacity-100 hover:shadow-glow-red"
						>
							<Icon data={Icons.crossIcon} stroke="transparent" class="w-4 h-4 relative z-10 " />
						</button>
					</div>
				</div>
				<!-- Close button on Mobile -->
				<div class="flex md:hidden items-center">
					<button
						type="button"
						class="bg-transparent relative text-red after:bg-radial-red hover:text-white rounded-full flex items-center justify-center border-0 w-8 h-8 after:ease-in-out after:duration-500 ease-in-out duration-500 after:absolute after:inset-0 after:rounded-full after:opacity-0 hover:after:opacity-100 hover:shadow-glow-red"
					>
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-4 h-4 relative z-10 " />
					</button>
				</div>
			</div>
		</div>

		<div class="gap-4 flex justify-end">
			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				><span class="relative z-10 leading-none">Cancel</span></button
			>

			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
				><span class="relative z-10 leading-none">Save</span></button
			>
		</div>
	</div>
</div>
