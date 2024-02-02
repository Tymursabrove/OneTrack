<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { slide } from "svelte/transition";
	let chapterExpand = false;
	const toggle = () => chapterExpand = !chapterExpand
</script>
<div class="-my-3 -mx-2.5 md:-m-4 xl:-m-7 flex flex-col flex-1">
	<div class="md:grid md:grid-cols-20 divide-y md:divide-y-0 md:divide-x divide-grey flex-1">
		<div class="md:col-span-7 lg:col-span-6 xl:col-span-5 2xl:col-span-4 flex flex-col divide-y divide-grey">
			<div class="p-3 py-5 2xl:p-5 space-y-4">
				<button class="text-transparent bg-clip-text bg-radial-blue hover:bg-radial-green hover:underline ease-in-out duration-300 font-semibold text-sm">Back to courses</button>
				<div class="flex justify-start items-start gap-1 flex-wrap">
					<span class="rounded-full py-0.5 text-xs px-2 bg-blue-box inline-flex items-center">Web</span>
				</div>
				<div class="space-y-1.5 text-left">
					<h2 class="text-xl text-white leading-none font-medium flex gap-1">Basics of Angular</h2>
					<p class="text-sm leading-snug text-grey-2">Introductory course for Angular and framework basics</p>
				</div>
				<div class="flex justify-between">
					<div class="flex gap-2 items-center text-sm text-grey-2">
						<span class="shirink-0"><Icon data={Icons.clockIcon} stroke="transparent" class="w-4 h-4 " /></span>
						<span>30 minutes</span>
					</div>

					<button on:click={toggle} aria-expanded={chapterExpand} type="button" class="relative md:hidden inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-blue hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:rounded-full after:inset-0 after:bg-radial-blue after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute {chapterExpand ? 'after:opacity-100' : 'after:opacity-0'}">
						<span class="relative z-10 leading-none"><span class="relative z-10 leading-none inline-flex gap-2 items-center"
							><Icon data={Icons.AngleDown} stroke="transparent" class="w-3 text-white shrink-0 ease-in-out duration-300 {chapterExpand ? 'rotate-180' : ''}" />Chapters</span
						></span>
					</button>

				</div>
			</div>

			{#if !chapterExpand}
			<div class="hidden md:block flex-1 p-3 2xl:p-5" >
				<ul class="space-y-4">
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border bg-blue-box border-transparent group-hover:border-transparent ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white " />
								<!-- else -->
								<span class="text-sm font-semibold hidden">1</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-sm 2xl:text-md font-medium text-white">Introduction</h3>
								<p class="text-sm text-white">Introducing the library and how it works</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border bg-blue-box border-transparent group-hover:border-transparent ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white " />
								<!-- else -->
								<span class="text-sm font-semibold hidden">2</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">Get the sample code</h3>
								<p class="text-sm text-white">Where to find the sample code and how to access it</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border border-grey group-hover:border-blue ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white hidden" />
								<!-- else -->
								<span class="text-sm font-semibold">3</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">Create a Firebase project and Set up your app</h3>
								<p class="text-sm text-white">How to create a basic Firebase project and how to run it locally</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border border-grey group-hover:border-blue ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white hidden" />
								<!-- else -->
								<span class="text-sm font-semibold">4</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">Install the Firebase Command Line Interface</h3>
								<p class="text-sm text-white">Setting up the Firebase CLI to access command line tools</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border border-grey group-hover:border-blue ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white hidden" />
								<!-- else -->
								<span class="text-sm font-semibold">5</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">Deploy and run the web app</h3>
								<p class="text-sm text-white">How to build, push and run the project remotely</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border border-grey group-hover:border-blue ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white hidden" />
								<!-- else -->
								<span class="text-sm font-semibold">6</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">The Functions Directory</h3>
								<p class="text-sm text-white">Introducing the Functions and Functions Directory</p>
							</div>

						</button>
					</li>
				</ul>
			</div>
			{/if}


			{#if chapterExpand}
			<div class="flex-1 p-3 2xl:p-5" transition:slide={{ duration: 300 }}>
				<ul class="space-y-4">
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border bg-blue-box border-transparent group-hover:border-transparent ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white " />
								<!-- else -->
								<span class="text-sm font-semibold hidden">1</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-sm 2xl:text-md font-medium text-white">Introduction</h3>
								<p class="text-sm text-white">Introducing the library and how it works</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border bg-blue-box border-transparent group-hover:border-transparent ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white " />
								<!-- else -->
								<span class="text-sm font-semibold hidden">2</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">Get the sample code</h3>
								<p class="text-sm text-white">Where to find the sample code and how to access it</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border border-grey group-hover:border-blue ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white hidden" />
								<!-- else -->
								<span class="text-sm font-semibold">3</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">Create a Firebase project and Set up your app</h3>
								<p class="text-sm text-white">How to create a basic Firebase project and how to run it locally</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border border-grey group-hover:border-blue ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white hidden" />
								<!-- else -->
								<span class="text-sm font-semibold">4</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">Install the Firebase Command Line Interface</h3>
								<p class="text-sm text-white">Setting up the Firebase CLI to access command line tools</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border border-grey group-hover:border-blue ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white hidden" />
								<!-- else -->
								<span class="text-sm font-semibold">5</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">Deploy and run the web app</h3>
								<p class="text-sm text-white">How to build, push and run the project remotely</p>
							</div>

						</button>
					</li>
					<li class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group after:opacity-30 after:inset-0 after:ease-in-out after:duration-300 after:absolute after:rounded-3xl after:border-2 after:border-transparent hover:after:border-blue">						
						<button type="button" class="w-full relative z-10 flex gap-2 p-3 2xl:p-5 outline-none rounded-3xl text-left" >
							<div class="2xl:w-9 2xl:h-9 w-7 h-7 border border-grey group-hover:border-blue ease-in-out duration-300 rounded-full flex items-center justify-center shrink-0">
							<!-- {(stage == completed) ? 'bg-blue-box border-transparent group-hover:border-transparent' : 'border-grey group-hover:border-blue'} -->
								<!-- if (stage == completed) -->								
								<Icon data={Icons.checkIcon} stroke="transparent" class="w-3 h-3 text-white hidden" />
								<!-- else -->
								<span class="text-sm font-semibold">6</span>
								<!-- end if -->
							</div>							
							<div class="space-y-1">
								<h3 class="text-md font-medium text-white">The Functions Directory</h3>
								<p class="text-sm text-white">Introducing the Functions and Functions Directory</p>
							</div>

						</button>
					</li>
				</ul>
			</div>
			{/if}
		</div> 
		<div class="md:col-span-13 lg:col-span-14 xl:col-span-15 2xl:col-span-16 flex-1 " >			
			<div class="max-w-screen-lg p-3 xs:p-5 2xl:py-10 2xl:px-20 w-full mx-auto">
				<div class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 ">
					<div class="flex flex-col justify-center items-center p-5 xl:p-10 relative z-10">
						<div class="space-y-3 text-left w-full">
							<h2 class="text-xl text-white leading-none font-medium flex gap-1">Basics of Angular</h2>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							
							<div class="overflow-hidden">
								<iframe class="w-full h-[550px]" height="350" src="https://www.youtube.com/embed/uygAaCsFDMQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
							</div>				
							
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							<p class="text-sm leading-snug font-semibold text-white">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   
							</p>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
							<p class="text-sm leading-snug text-white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
						</div>
					</div>
				</div>

				<div class="pt-8 pb-4 gap-4 flex flex-wrap justify-center">
					<button type="button" class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-blue hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-blue after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute w-44">
						<span class="relative z-10 leading-none"><span class="relative z-10 leading-none inline-flex gap-2 items-center"
							><Icon data={Icons.AngleLeft} stroke="transparent" class="h-3 text-white shrink-0" />Previous lesson</span
						></span>
					</button>
					<button
						type="button"
						class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-blue hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-blue after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute w-44">
						<span class="relative z-10 leading-none">
							<span class="relative z-10 leading-none inline-flex gap-2 items-center">
							Next lesson<Icon data={Icons.AngleRight} stroke="transparent" class="h-3 text-white shrink-0" /></span>
						</span>
					</button>
				</div>

			</div>
		</div> 
	</div>
</div>
