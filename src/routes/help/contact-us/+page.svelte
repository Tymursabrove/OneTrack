<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
</script>

<main class="p-0 max-w-screen-xl mx-auto w-full flex-1 flex flex-col justify-center xl:px-9">
	<div class="relative xl:px-16">
		<button
			type="button"
			class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-5 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
			><span class="relative z-10 leading-none inline-flex gap-2 items-center"
				><Icon data={Icons.AngleLeft} stroke="transparent" class="h-3 text-white shrink-0" />Back to
				Help Center</span
			></button
		>
		<!-- Content -->
		<div class="relative py-5">
			<!-- Heading -->
			<div class="text-center space-y-5">
				<h2 class="text-xl sm:text-3xl xl:text-4xl font-semibold">Contact support</h2>
				<div class="outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center" >
					<div class="w-full flex flex-col relative z-10 p-5 xs:p-10 space-y-5">
						<div class="space-y-1.5 text-left">
							<h2 class="text-xl text-white leading-none font-medium flex gap-1">
								Submit your request
							</h2>
							<p class="text-sm leading-none text-grey-2">
								Your request will be processed and our support staff will get back to you in 24
								hours.
							</p>
						</div>
						<div class="flex flex-col gap-5">
							<div class="relative w-full">
								<label for="name" class="sr-only">Name</label>
								<div
									class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
								>
									<input
										class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										id="name"
										name="name"
										placeholder="Name"
									/>
								</div>
							</div>

							<div class="relative w-full">
								<label for="email" class="sr-only">E-Mail</label>
								<div
									class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
								>
									<input
										class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="email"
										id="email"
										name="email"
										placeholder="E-Mail"
									/>
								</div>
							</div>

							<div class="relative w-full">
								<label for="subject" class="sr-only">Subject</label>
								<div
									class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
								>
									<input
										class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										id="subject"
										name="subject"
										placeholder="Subject"
									/>
								</div>
							</div>

							<div class="relative w-full">
								<label for="message" class="sr-only">Message</label>
								<div
									class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
								>
									<textarea
										class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-60 w-full"
										id="message"
										name="message"
										placeholder="Message"
									/>
								</div>
							</div>
							<div class="pt-2 gap-4 flex justify-end">
								<button
									type="button"
									class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
									><span class="relative z-10 leading-none">Cancel</span></button
								>
								<button
									type="button"
									class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
									><span class="relative z-10 leading-none">Submit</span></button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
