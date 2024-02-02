<script>
	import Chart from '$lib/components/charts/Chart.svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';

	export let data=[];
	export let id="test";
	export let type = 'other';
</script>

<div
	class="bg-transparent flex relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 rounded-3xl col-span-5"
>
	<div class="relative z-10 flex flex-col-reverse md:flex-row flex-1">
		<div class="flex flex-col max-w-xs mx-auto">
			<div class="rounded-3xl overflow-hidden">
				<img
					src="/images/meta-card-thumb.png"
					class="object-cover aspect-[1.5/1] w-full"
					alt="test"
				/>
			</div>
			<div class="px-3 py-5">
				<div class="divide-y divide-grey">
					<div class="space-y-5 pb-5">
						<h3 class="text-lg 2xl:text-xl text-white leading-none font-medium flex gap-1">
							Headline Lorem Ipsum
						</h3>
						<div class="flex gap-2">
							<button
								class="relative flex-1 overflow-hidden justify-center  before:bg-radial-red  before:rounded-md border border-transparent before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 shadow-sm hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-md after:bg-radial-red-light focus:outline-none before:inset-0 after:inset-0 before:absolute after:absolute"
							>
								<span
									class="drop-shadow-1 relative z-10 justify-center flex flex-col gap-1 px-2 py-3 text-sm font-medium text-white"
									><span class="whitespace-nowrap leading-none truncate">OneTrack ROAS</span><span
										class="text-xl leading-none">2.16</span
									>
								</span></button
							>
							<button
								class="relative flex-1 overflow-hidden justify-center before:bg-radial-green-2  before:rounded-md border border-transparent before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 shadow-sm hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-md after:bg-radial-green focus:outline-none before:inset-0 after:inset-0 before:absolute after:absolute"
								><span
									class="drop-shadow-1 relative z-10 justify-center flex flex-col gap-1 px-2 py-3 text-sm font-medium text-white max-w-full"
									><span class="whitespace-nowrap leading-none truncate">Meta ROAS</span><span
										class="text-xl leading-none">1.87</span
									></span
								></button
							>
						</div>
					</div>
					<div class="pt-5 pb-10 space-y-8">
						<div class="flex gap-2 relative items-center">
							<label for="default-range" class="uppercase font-semibold text-sm">CPC</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="default-range"
									type="range"
									value="30"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-red-yellow-green"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:30%; --tw-translate-x:-30%">$1.5</span
								>
							</div>
						</div>
						<div class="flex gap-2 relative items-center">
							<label for="default-range" class="uppercase font-semibold text-sm">CPM</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="default-range"
									type="range"
									value="70"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-green-yellow-red"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:70%; --tw-translate-x:-70%">$2.15</span
								>
							</div>
						</div>
					</div>

					<div class="pt-5">
						<table class="w-full border-0 border-collapse">
							<tr
								><th class="font-medium text-sm text-left">#Ads</th><td class="text-right text-sm"
									>3</td
								></tr
							>
							<tr
								><th class="font-medium text-sm text-left">Spend</th><td class="text-right text-sm"
									>$1020.28</td
								></tr
							>
							<tr
								><th class="font-medium text-sm text-left">Impressions</th><td
									class="text-right text-sm">69359</td
								></tr
							>
							<tr
								><th class="font-medium text-sm text-left">Purchases</th><td
									class="text-right text-sm">119</td
								></tr
							>
							<tr
								><th class="font-medium text-sm text-left">Leads</th><td class="text-right text-sm"
									>119</td
								></tr
							>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="md:grid md:grid-cols-8 flex flex-col gap-5 p-5 flex-1 relative">
			<!-- Close Button -->
			<button
				class="absolute top-6 right-6 z-20 justify-center items-center rounded-full w-7 h-7 hover:bg-radial-red ease-in-out duration-300 text-white flex"
				><Icon data={Icons.crossIcon} class="w-3" color="currentColor" /></button
			>

			<div class="gap-5 flex flex-col justify-between sm:col-span-4 2xl:col-span-2">
				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl">
						<div class="flex flex-col py-3 px-4 pb-0 flex-1 space-y-1.5">
							<p class="text-white font-semibold text-xl">Conversions</p>
							<div class="flex flex-wrap items-end gap-y-3 gap-x-1">
								<p class="font-bold text-3xl text-left leading-none">4,123</p>
								<p class="text-sm text-left leading-none text-white/70 font-medium pb-1">
									<!-- if level up -->
									<!-- <span class="relative font-semibold text-green "><Icon data={levelUp} class="w-3 absolute -top-2" color="currentColor" /> 2%</span> -->
									<span class="relative font-semibold text-red "
										><Icon
											data={Icons.levelDownIcon}
											class="w-3 absolute -top-2"
											color="currentColor"
										/> 2%</span
									> below target
								</p>
							</div>
						</div>
						<!-- graph bottom -->
						<div class="h-16 rounded-b-3xl overlfow-hidden -mt-1">
							<Chart
								id="chart-card-{id}"
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={true}
								showTooltip={false}
								border="1px"
							/>
							<!-- series={data.chartSeries} -->
						</div>
					</div>
				</div>

				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl">
						<div class="flex flex-col py-3 px-4 pb-0 flex-1 space-y-1.5">
							<p class="text-white font-semibold text-xl">Conversions</p>
							<div class="flex flex-wrap items-end gap-y-3 gap-x-1">
								<p class="font-bold text-3xl text-left leading-none">4,123</p>
								<p class="text-sm text-left leading-none text-white/70 font-medium pb-1">
									<!-- if level up -->
									<!-- <span class="relative font-semibold text-green "><Icon data={levelUp} class="w-3 absolute -top-2" color="currentColor" /> 2%</span> -->
									<span class="relative font-semibold text-red "
										><Icon
											data={Icons.levelDownIcon}
											class="w-3 absolute -top-2"
											color="currentColor"
										/> 2%</span
									> below target
								</p>
							</div>
						</div>
						<!-- graph bottom -->
						<div class="h-16 rounded-b-3xl overlfow-hidden -mt-1">
							<Chart
								id="chart-card-{id}"
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={true}
								showTooltip={false}
								border="1px"
							/>
							<!-- series={data.chartSeries} -->
						</div>
					</div>
				</div>

				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl">
						<div class="flex flex-col py-3 px-4 pb-0 flex-1 space-y-1.5">
							<p class="text-white font-semibold text-xl">Conversions</p>
							<div class="flex flex-wrap items-end gap-y-3 gap-x-1">
								<p class="font-bold text-3xl text-left leading-none">4,123</p>
								<p class="text-sm text-left leading-none text-white/70 font-medium pb-1">
									<!-- if level up -->
									<!-- <span class="relative font-semibold text-green "><Icon data={levelUp} class="w-3 absolute -top-2" color="currentColor" /> 2%</span> -->
									<span class="relative font-semibold text-red "
										><Icon
											data={Icons.levelDownIcon}
											class="w-3 absolute -top-2"
											color="currentColor"
										/> 2%</span
									> below target
								</p>
							</div>
						</div>
						<!-- graph bottom -->
						<div class="h-16 rounded-b-3xl overlfow-hidden -mt-1">
							<Chart
								id="chart-card-{id}"
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={true}
								showTooltip={false}
								border="1px"
							/>
							<!-- series={data.chartSeries} -->
						</div>
					</div>
				</div>

				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl">
						<div class="flex flex-col py-3 px-4 pb-0 flex-1 space-y-1.5">
							<p class="text-white font-semibold text-xl">Conversions</p>
							<div class="flex flex-wrap items-end gap-y-3 gap-x-1">
								<p class="font-bold text-3xl text-left leading-none">4,123</p>
								<p class="text-sm text-left leading-none text-white/70 font-medium pb-1">
									<!-- if level up -->
									<!-- <span class="relative font-semibold text-green "><Icon data={levelUp} class="w-3 absolute -top-2" color="currentColor" /> 2%</span> -->
									<span class="relative font-semibold text-red "
										><Icon
											data={Icons.levelDownIcon}
											class="w-3 absolute -top-2"
											color="currentColor"
										/> 2%</span
									> below target
								</p>
							</div>
						</div>
						<!-- graph bottom -->
						<div class="h-16 rounded-b-3xl overlfow-hidden -mt-1">
							<Chart
								id="chart-card-{id}"
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={true}
								showTooltip={false}
								border="1px"
							/>
							<!-- series={data.chartSeries} -->
						</div>
					</div>
				</div>
			</div>

			<div
				class="sm:col-span-4 2xl:col-span-2 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 "
			>
				<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl py-3 px-4 space-y-5">
					<p class="text-white font-semibold text-xl">Platform performance</p>
					<div class="h-52 overflow-hidden flex items-center justify-center">Chart goes here</div>
					<div class="relative">
						<table class="w-full border-0 border-collapse">
							<tr>
								<td class="py-1 "
									><span class="inline-flex w-3 h-3 rounded-full bg-radial-blue" /></td
								>
								<td class="py-1 text-left font-semibold w-2/3 px-2">Meta</td>
								<td class="py-1 text-right">12.34%</td>
							</tr>
							<tr>
								<td class="py-1 "
									><span class="inline-flex w-3 h-3 rounded-full bg-radial-purple" /></td
								>
								<td class="py-1 text-left font-semibold w-2/3 px-2">TikTok</td>
								<td class="py-1 text-right">12.34%</td>
							</tr>
							<tr>
								<td class="py-1 "
									><span class="inline-flex w-3 h-3 rounded-full bg-radial-green" /></td
								>
								<td class="py-1 text-left font-semibold w-2/3 px-2">Google</td>
								<td class="py-1 text-right">12.34%</td>
							</tr>
						</table>
					</div>

					<div class="relative border-t border-grey py-5 space-y-10">
						<div class="flex gap-2 relative items-center">
							<label for="CPC-2" class="uppercase font-semibold text-sm">CPC</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="CPC-2"
									type="range"
									value="30"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-red-yellow-green"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:30%; --tw-translate-x:-30%">$1.5</span
								>
							</div>
						</div>
						<div class="flex gap-2 relative items-center">
							<label for="CPM-2" class="uppercase font-semibold text-sm">CPM</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="CPM-2"
									type="range"
									value="50"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-green-yellow-red"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:50%; --tw-translate-x:-50%">$2.5</span
								>
							</div>
						</div>
						<div class="flex gap-2 relative items-center">
							<label for="CPM-3" class="uppercase font-semibold text-sm">CPM</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="CPM-3"
									type="range"
									value="80"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-green-yellow-red"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:80%; --tw-translate-x:-80%">$3.5</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-span-8 2xl:col-span-4 flex flex-col gap-5">
				<div
					class="flex-1 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden">
						<div class=" flex flex-col rounded-3xl space-y-5">
							<div class="p-5 space-y-4">
								<div class="space-y-1">
									<h3 class="text-lg text-white leading-none font-medium flex gap-1">
										Some Metrics?
									</h3>
									<p class="text-sm leading-none text-grey-2">
										Here are your Ad Spend, profits and ROAS over all platforms
									</p>
								</div>

								<div class="flex flex-wrap gap-10">
									<div class="space-y-1">
										<p class="font-bold text-3xl text-left leading-none">$25,000</p>
										<p class="text-xs text-left leading-none text-white font-medium pb-1">
											Ad Spend
										</p>
									</div>
									<div class="space-y-1">
										<p class="font-bold text-3xl text-left leading-none">$25,000</p>
										<p class="text-xs text-left leading-none text-white font-medium pb-1">
											Ad Spend
										</p>
									</div>
									<div class="space-y-1">
										<p class="font-bold text-3xl text-left leading-none">4.45</p>
										<p class="text-xs text-left leading-none text-white font-medium pb-1">ROAS</p>
									</div>
								</div>
							</div>
							<div class="h-40 flex justify-center items-center">Chart goes here</div>
						</div>
					</div>
				</div>
				<div
					class="flex-1 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl py-3 px-4 space-y-5">
						<div class="space-y-1">
							<h3 class="text-lg text-white leading-none font-medium flex gap-1">Some Metrics?</h3>
							<p class="text-sm leading-none text-grey-2">
								Here are your Ad Spend, profits and ROAS over all platforms
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Second -->

<div
	class="bg-transparent flex relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 rounded-3xl"
>
	<div class="relative z-10 flex flex-col-reverse md:flex-row flex-1">
		<div class="flex flex-col max-w-xs mx-auto">
			<div class="rounded-3xl overflow-hidden">
				<img
					src="/images/meta-card-thumb.png"
					class="object-cover aspect-[1.5/1] w-full"
					alt="test"
				/>
			</div>
			<div class="px-3 py-5">
				<div class="divide-y divide-grey">
					<div class="space-y-5 pb-5">
						<h3 class="text-lg 2xl:text-xl text-white leading-none font-medium flex gap-1">
							Headline Lorem Ipsum
						</h3>
						<div class="flex gap-2">
							<button
								class="relative flex-1 overflow-hidden justify-center  before:bg-radial-red  before:rounded-md border border-transparent before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 shadow-sm hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-md after:bg-radial-red-light focus:outline-none before:inset-0 after:inset-0 before:absolute after:absolute"
							>
								<span
									class="drop-shadow-1 relative z-10 justify-center flex flex-col gap-1 px-2 py-3 text-sm font-medium text-white"
									><span class="whitespace-nowrap leading-none truncate">OneTrack ROAS</span><span
										class="text-xl leading-none">2.16</span
									>
								</span></button
							>
							<button
								class="relative flex-1 overflow-hidden justify-center before:bg-radial-green-2  before:rounded-md border border-transparent before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 shadow-sm hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-md after:bg-radial-green focus:outline-none before:inset-0 after:inset-0 before:absolute after:absolute"
								><span
									class="drop-shadow-1 relative z-10 justify-center flex flex-col gap-1 px-2 py-3 text-sm font-medium text-white max-w-full"
									><span class="whitespace-nowrap leading-none truncate">Meta ROAS</span><span
										class="text-xl leading-none">1.87</span
									></span
								></button
							>
						</div>
					</div>
					<div class="pt-5 pb-10 space-y-8">
						<div class="flex gap-2 relative items-center">
							<label for="default-range" class="uppercase font-semibold text-sm">CPC</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="default-range"
									type="range"
									value="30"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-red-yellow-green"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:30%; --tw-translate-x:-30%">$1.5</span
								>
							</div>
						</div>
						<div class="flex gap-2 relative items-center">
							<label for="default-range" class="uppercase font-semibold text-sm">CPM</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="default-range"
									type="range"
									value="70"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-green-yellow-red"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:70%; --tw-translate-x:-70%">$2.15</span
								>
							</div>
						</div>
					</div>

					<div class="pt-5">
						<table class="w-full border-0 border-collapse">
							<tr
								><th class="font-medium text-sm text-left">#Ads</th><td class="text-right text-sm"
									>3</td
								></tr
							>
							<tr
								><th class="font-medium text-sm text-left">Spend</th><td class="text-right text-sm"
									>$1020.28</td
								></tr
							>
							<tr
								><th class="font-medium text-sm text-left">Impressions</th><td
									class="text-right text-sm">69359</td
								></tr
							>
							<tr
								><th class="font-medium text-sm text-left">Purchases</th><td
									class="text-right text-sm">119</td
								></tr
							>
							<tr
								><th class="font-medium text-sm text-left">Leads</th><td class="text-right text-sm"
									>119</td
								></tr
							>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="md:grid md:grid-cols-8 flex flex-col gap-5 p-5 flex-1 relative md:hidden ">
			<!-- Close Button -->
			<button
				class="absolute top-6 right-6 z-20 justify-center items-center rounded-full w-7 h-7 hover:bg-radial-red ease-in-out duration-300 text-white flex"
				><Icon data={Icons.crossIcon} class="w-3" color="currentColor" /></button
			>

			<div class="gap-5 flex flex-col justify-between sm:col-span-4 2xl:col-span-2">
				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl">
						<div class="flex flex-col py-3 px-4 pb-0 flex-1 space-y-1.5">
							<p class="text-white font-semibold text-xl">Conversions</p>
							<div class="flex flex-wrap items-end gap-y-3 gap-x-1">
								<p class="font-bold text-3xl text-left leading-none">4,123</p>
								<p class="text-sm text-left leading-none text-white/70 font-medium pb-1">
									<!-- if level up -->
									<!-- <span class="relative font-semibold text-green "><Icon data={levelUp} class="w-3 absolute -top-2" color="currentColor" /> 2%</span> -->
									<span class="relative font-semibold text-red "
										><Icon
											data={Icons.levelDownIcon}
											class="w-3 absolute -top-2"
											color="currentColor"
										/> 2%</span
									> below target
								</p>
							</div>
						</div>
						<!-- graph bottom -->
						<div class="h-16 rounded-b-3xl overlfow-hidden -mt-1">
							<Chart
								id="chart-card-{id}"
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={true}
								showTooltip={false}
								border="1px"
							/>
							<!-- series={data.chartSeries} -->
						</div>
					</div>
				</div>

				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl">
						<div class="flex flex-col py-3 px-4 pb-0 flex-1 space-y-1.5">
							<p class="text-white font-semibold text-xl">Conversions</p>
							<div class="flex flex-wrap items-end gap-y-3 gap-x-1">
								<p class="font-bold text-3xl text-left leading-none">4,123</p>
								<p class="text-sm text-left leading-none text-white/70 font-medium pb-1">
									<!-- if level up -->
									<!-- <span class="relative font-semibold text-green "><Icon data={levelUp} class="w-3 absolute -top-2" color="currentColor" /> 2%</span> -->
									<span class="relative font-semibold text-red "
										><Icon
											data={Icons.levelDownIcon}
											class="w-3 absolute -top-2"
											color="currentColor"
										/> 2%</span
									> below target
								</p>
							</div>
						</div>
						<!-- graph bottom -->
						<div class="h-16 rounded-b-3xl overlfow-hidden -mt-1">
							<Chart
								id="chart-card-{id}"
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={true}
								showTooltip={false}
								border="1px"
							/>
							<!-- series={data.chartSeries} -->
						</div>
					</div>
				</div>

				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl">
						<div class="flex flex-col py-3 px-4 pb-0 flex-1 space-y-1.5">
							<p class="text-white font-semibold text-xl">Conversions</p>
							<div class="flex flex-wrap items-end gap-y-3 gap-x-1">
								<p class="font-bold text-3xl text-left leading-none">4,123</p>
								<p class="text-sm text-left leading-none text-white/70 font-medium pb-1">
									<!-- if level up -->
									<!-- <span class="relative font-semibold text-green "><Icon data={levelUp} class="w-3 absolute -top-2" color="currentColor" /> 2%</span> -->
									<span class="relative font-semibold text-red "
										><Icon
											data={Icons.levelDownIcon}
											class="w-3 absolute -top-2"
											color="currentColor"
										/> 2%</span
									> below target
								</p>
							</div>
						</div>
						<!-- graph bottom -->
						<div class="h-16 rounded-b-3xl overlfow-hidden -mt-1">
							<Chart
								id="chart-card-{id}"
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={true}
								showTooltip={false}
								border="1px"
							/>
							<!-- series={data.chartSeries} -->
						</div>
					</div>
				</div>

				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl">
						<div class="flex flex-col py-3 px-4 pb-0 flex-1 space-y-1.5">
							<p class="text-white font-semibold text-xl">Conversions</p>
							<div class="flex flex-wrap items-end gap-y-3 gap-x-1">
								<p class="font-bold text-3xl text-left leading-none">4,123</p>
								<p class="text-sm text-left leading-none text-white/70 font-medium pb-1">
									<!-- if level up -->
									<!-- <span class="relative font-semibold text-green "><Icon data={levelUp} class="w-3 absolute -top-2" color="currentColor" /> 2%</span> -->
									<span class="relative font-semibold text-red "
										><Icon
											data={Icons.levelDownIcon}
											class="w-3 absolute -top-2"
											color="currentColor"
										/> 2%</span
									> below target
								</p>
							</div>
						</div>
						<!-- graph bottom -->
						<div class="h-16 rounded-b-3xl overlfow-hidden -mt-1">
							<Chart
								id="chart-card-{id}"
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={true}
								showTooltip={false}
								border="1px"
							/>
							<!-- series={data.chartSeries} -->
						</div>
					</div>
				</div>
			</div>

			<div
				class="sm:col-span-4 2xl:col-span-2 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 "
			>
				<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl py-3 px-4 space-y-5">
					<p class="text-white font-semibold text-xl">Platform performance</p>
					<div class="h-52 overflow-hidden flex items-center justify-center">Chart goes here</div>
					<div class="relative">
						<table class="w-full border-0 border-collapse">
							<tr>
								<td class="py-1 "
									><span class="inline-flex w-3 h-3 rounded-full bg-radial-blue" /></td
								>
								<td class="py-1 text-left font-semibold w-2/3 px-2">Meta</td>
								<td class="py-1 text-right">12.34%</td>
							</tr>
							<tr>
								<td class="py-1 "
									><span class="inline-flex w-3 h-3 rounded-full bg-radial-purple" /></td
								>
								<td class="py-1 text-left font-semibold w-2/3 px-2">TikTok</td>
								<td class="py-1 text-right">12.34%</td>
							</tr>
							<tr>
								<td class="py-1 "
									><span class="inline-flex w-3 h-3 rounded-full bg-radial-green" /></td
								>
								<td class="py-1 text-left font-semibold w-2/3 px-2">Google</td>
								<td class="py-1 text-right">12.34%</td>
							</tr>
						</table>
					</div>

					<div class="relative border-t border-grey py-5 space-y-10">
						<div class="flex gap-2 relative items-center">
							<label for="CPC-2" class="uppercase font-semibold text-sm">CPC</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="CPC-2"
									type="range"
									value="30"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-red-yellow-green"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:30%; --tw-translate-x:-30%">$1.5</span
								>
							</div>
						</div>
						<div class="flex gap-2 relative items-center">
							<label for="CPM-2" class="uppercase font-semibold text-sm">CPM</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="CPM-2"
									type="range"
									value="50"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-green-yellow-red"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:50%; --tw-translate-x:-50%">$2.5</span
								>
							</div>
						</div>
						<div class="flex gap-2 relative items-center">
							<label for="CPM-3" class="uppercase font-semibold text-sm">CPM</label>
							<div class="relative flex-1 -mt-1">
								<input
									id="CPM-3"
									type="range"
									value="80"
									class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-green-yellow-red"
								/>
								<span
									class="text-sm text-center absolute -bottom-5 transform"
									style="left:80%; --tw-translate-x:-80%">$3.5</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-span-8 2xl:col-span-4 flex flex-col gap-5">
				<div
					class="flex-1 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden">
						<div class=" flex flex-col rounded-3xl space-y-5">
							<div class="p-5 space-y-4">
								<div class="space-y-1">
									<h3 class="text-lg text-white leading-none font-medium flex gap-1">
										Some Metrics?
									</h3>
									<p class="text-sm leading-none text-grey-2">
										Here are your Ad Spend, profits and ROAS over all platforms
									</p>
								</div>

								<div class="flex flex-wrap gap-10">
									<div class="space-y-1">
										<p class="font-bold text-3xl text-left leading-none">$25,000</p>
										<p class="text-xs text-left leading-none text-white font-medium pb-1">
											Ad Spend
										</p>
									</div>
									<div class="space-y-1">
										<p class="font-bold text-3xl text-left leading-none">$25,000</p>
										<p class="text-xs text-left leading-none text-white font-medium pb-1">
											Ad Spend
										</p>
									</div>
									<div class="space-y-1">
										<p class="font-bold text-3xl text-left leading-none">4.45</p>
										<p class="text-xs text-left leading-none text-white font-medium pb-1">ROAS</p>
									</div>
								</div>
							</div>
							<div class="h-40 flex justify-center items-center">Chart goes here</div>
						</div>
					</div>
				</div>
				<div
					class="flex-1 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 overflow-hidden flex flex-col rounded-3xl py-3 px-4 space-y-5">
						<div class="space-y-1">
							<h3 class="text-lg text-white leading-none font-medium flex gap-1">Some Metrics?</h3>
							<p class="text-sm leading-none text-grey-2">
								Here are your Ad Spend, profits and ROAS over all platforms
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
