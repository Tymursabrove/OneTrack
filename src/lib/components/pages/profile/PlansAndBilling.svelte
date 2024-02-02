<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
</script>

<div class="relative">
	<div class="space-y-8 divide-y divide-grey">
		<!-- Change your plan -->
		<div class="space-y-8">
			<div class="space-y-6 pt-8">
				<div class="space-y-5">
					<h1 class="text-2xl font-bold text-white ">Plans & Billing</h1>
					<div class="space-y-3">
						<h2 class="text-xl text-white leading-none font-medium flex gap-1">Change your plan</h2>
						<p class="text-sm leading-none text-grey-2">Upgrade or downgrade your current plan.</p>
					</div>
					<div
						class="shadow-glow-blue flex gap-2 items-center justify-start rounded-md bg-blue-box text-white py-1.5 px-4"
					>
						<span class="w-6 h-6 border border-white rounded-full flex items-center justify-center"
							><Icon
								data={Icons.infoLightIcon}
								stroke="transparent"
								class="h-3 w-5"
								color="currentColor"
							/></span
						>
						<p class="text-sm font-semibold">
							Changing the plan will take effect immediately. You will be charged for the rest of
							the current month.
						</p>
					</div>
				</div>
			</div>
			<!-- Boxes here -->
			<div class="max-w-full relative">
				<div class="grid grid-cols-4 flex-1 gap-3">
					<label for="start" class="flex flex-col relative">
						<input id="start" type="radio" name="plan" class="sr-only peer" checked />
						<div
							class="bg-transparent w-full relative hover:before:shadow-glow-blue before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-60 before:inset-0 before:ease-in-out before:duration-500 after:absolute after:inset-0 after:border-4 peer-checked:after:border-blue after:rounded-3xl after:border-transparent after:ease-in-out after:duration-500"
						>
							<div class="relative z-10 overflow-hidden flex flex-col rounded-2xl px-5 py-5">
								<div class="space-y-3">
									<h4 class="text-sm font-semibold text-white leading-none">Start</h4>
									<p class="text-sm font-normal text-grey-2 leading-snug min-h-10">
										Starter plan for
										<br /> individuals.
									</p>
									<p class="text-sm font-normal text-grey-2 leading-none">
										<strong class="text-base font-semibold text-white">$10</strong> / month
									</p>
								</div>
							</div>
						</div>
						<div
							class="w-10 h-10 absolute bottom-4 right-4 ease-in-out duration-500 peer-checked:opacity-100 opacity-0 "
						>
							<img src={Icons.blueTickIcon} class="w-14 h-14" alt="test" />
						</div>
					</label>

					<label for="advanced" class="flex flex-col relative">
						<input id="advanced" type="radio" name="plan" class="sr-only peer" />
						<div
							class="bg-transparent w-full relative hover:before:shadow-glow-blue before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-60 before:inset-0 before:ease-in-out before:duration-500 after:absolute after:inset-0 after:border-4 peer-checked:after:border-blue after:rounded-3xl after:border-transparent after:ease-in-out after:duration-500"
						>
							<div class="relative z-10 overflow-hidden flex flex-col rounded-2xl px-5 py-5">
								<div class="space-y-3">
									<h4 class="text-sm font-semibold text-white leading-none">Advanced</h4>
									<p class="text-sm font-normal text-grey-2 leading-snug min-h-10">
										StarCollaborate up to 10 people.
									</p>
									<p class="text-sm font-normal text-grey-2 leading-none">
										<strong class="text-base font-semibold text-white">$20</strong> / month
									</p>
								</div>
							</div>
						</div>
						<div
							class="w-10 h-10 absolute bottom-4 right-4 ease-in-out duration-500 peer-checked:opacity-100 opacity-0 "
						>
							<img src={Icons.blueTickIcon} class="w-14 h-14" alt="test" />
						</div>
					</label>

					<label for="business" class="flex flex-col relative">
						<input id="business" type="radio" name="plan" class="sr-only peer" />
						<div
							class="bg-transparent w-full relative hover:before:shadow-glow-blue before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-60 before:inset-0 before:ease-in-out before:duration-500 after:absolute after:inset-0 after:border-4 peer-checked:after:border-blue after:rounded-3xl after:border-transparent after:ease-in-out after:duration-500"
						>
							<div class="relative z-10 overflow-hidden flex flex-col rounded-2xl px-5 py-5">
								<div class="space-y-3">
									<h4 class="text-sm font-semibold text-white leading-none">Business</h4>
									<p class="text-sm font-normal text-grey-2 leading-snug min-h-10">
										For bigger businesses.
									</p>
									<p class="text-sm font-normal text-grey-2 leading-none">
										<strong class="text-base font-semibold text-white">$40</strong> / month
									</p>
								</div>
							</div>
						</div>
						<div
							class="w-10 h-10 absolute bottom-4 right-4 ease-in-out duration-500 peer-checked:opacity-100 opacity-0 "
						>
							<img src={Icons.blueTickIcon} class="w-14 h-14" alt="test" />
						</div>
					</label>

					<label for="pro" class="flex flex-col relative">
						<input id="pro" type="radio" name="plan" class="sr-only peer" />
						<div
							class="bg-transparent w-full relative hover:before:shadow-glow-blue before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-60 before:inset-0 before:ease-in-out before:duration-500 after:absolute after:inset-0 after:border-4 peer-checked:after:border-blue after:rounded-3xl after:border-transparent after:ease-in-out after:duration-500"
						>
							<div class="relative z-10 overflow-hidden flex flex-col rounded-2xl px-5 py-5">
								<div class="space-y-3">
									<h4 class="text-sm font-semibold text-white leading-none">Pro</h4>
									<p class="text-sm font-normal text-grey-2 leading-snug min-h-10">
										For awesomeness.
									</p>
									<p class="text-sm font-normal text-grey-2 leading-none">
										<strong class="text-base font-semibold text-white">$80</strong> / month
									</p>
								</div>
							</div>
						</div>
						<div
							class="w-10 h-10 absolute bottom-4 right-4 ease-in-out duration-500 peer-checked:opacity-100 opacity-0 "
						>
							<img src={Icons.blueTickIcon} class="w-14 h-14" alt="test" />
						</div>
					</label>
				</div>
			</div>

			<div class="flex justify-center text-center ">
				<button
					type="button"
					class="text-sm leading-none text-grey-2 py-1.5 px-3 rounded hover:shadow-glow-red underline  after:bg-radial-red hover:text-white hover:no-underline ease-in-out duration-300 after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded after:opacity-0 hover:after:opacity-100 relative"
					><span class="relative z-10">Cancel my subscription</span></button
				>
			</div>
		</div>
		<!-- Invoice -->
		<div class="space-y-8">
			<div class="space-y-3 pt-8">
				<h2 class="text-xl text-white leading-none font-medium flex gap-1">Invoice</h2>
				<p class="text-sm leading-none text-grey-2">View and download all of your invoices here.</p>
			</div>
			<!-- table -->
			<div
				class="w-full flex-1 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 py-5 px-8"
			>
				<div class="gap-4 grid grid-cols-12 max-w-full">
					<div
						class="overflow-auto max-w-full flex-1 on-hover-scroll col-span-12 max-h-110 md:max-h-inherit md:min-h-md relative z-20"
					>
						<table class="min-w-full border-collapse">
							<thead class="top-0 z-20">
								<tr class="border-b border-grey relative z-10 ">
									<th
										colspan="1"
										class="py-2 pr-4 sm:pr-6 text-left text-sm font-semibold text-white"
									>
										Date
									</th>
									<th
										colspan="1"
										class="py-2 px-4 sm:px-6 text-left text-sm font-semibold text-white"
									>
										Description
									</th>
									<th
										colspan="1"
										class="py-2 px-4 sm:px-6 text-left text-sm font-semibold text-white"
									>
										Invoice-no.
									</th>
									<th
										colspan="1"
										class="py-2 px-4 sm:px-6 text-right text-sm font-semibold text-white"
									>
										Amount
									</th>
									<th
										colspan="1"
										class="py-2 pl-4 sm:pl-6 text-right text-sm font-semibold text-white"
									>
										PDF
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-grey">
								<tr>
									<td class="py-2 pr-4 text-sm text-white sm:pr-6 ">03.05.2022</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">somethingsomething Server</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">0123456789</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 text-right ">$15.00</td>
									<td class=" py-2 pl-4 text-sm text-white sm:pl-6 text-right ">$15.00</td>
								</tr>
								<tr>
									<td class="py-2 pr-4 text-sm text-white sm:pr-6 ">02.05.2022</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">somethingsomething</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">0123456788</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 text-right ">$20.00</td>
									<td class=" py-2 pl-4 text-sm text-white sm:pl-6 text-right ">$15.00</td>
								</tr>
								<tr>
									<td class="py-2 pr-4 text-sm text-white sm:pr-6 ">01.05.2022</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">somethingsomething Basic</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">0123456787</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 text-right ">$10.00</td>
									<td class=" py-2 pl-4 text-sm text-white sm:pl-6 text-right ">$15.00</td>
								</tr>
								<tr>
									<td class="py-2 pr-4 text-sm text-white sm:pr-6 ">15.04.2022</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">somethingsomething</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">0123456786</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 text-right ">$15.00</td>
									<td class=" py-2 pl-4 text-sm text-white sm:pl-6 text-right ">$15.00</td>
								</tr>
								<tr>
									<td class="py-2 pr-4 text-sm text-white sm:pr-6 ">01.04.2022</td>
									<td class=" py-4 px-4 text-sm text-white sm:px-6 ">somethingsomething</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">0123456785</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 text-right ">$10.00</td>
									<td class=" py-2 pl-4 text-sm text-white sm:pl-6 text-right ">$15.00</td>
								</tr>
								<tr>
									<td class="py-2 pr-4 text-sm text-white sm:pr-6 ">01.03.2022</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">somethingsomething Basic</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 ">0123456784</td>
									<td class=" py-2 px-4 text-sm text-white sm:px-6 text-right ">$10.00</td>
									<td class=" py-2 pl-4 text-sm text-white sm:pl-6 text-right ">$15.00</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- Payment and Details -->
		<div class="space-y-8">
			<div class="space-y-6">
				<div class="space-y-3 pt-8">
					<h2 class="text-xl text-white leading-none font-medium flex gap-1">Payment Details</h2>
					<p class="text-sm leading-none text-grey-2">Update your billing information.</p>
				</div>
				<div class="flex gap-2 text-white">
					<Icon data={Icons.visaIcon} stroke="transparent" class="w-14" color="currentColor" />
					<Icon
						data={Icons.masterCardIcon}
						stroke="transparent"
						class="w-14"
						color="currentColor"
					/>
				</div>
			</div>
			<!-- table -->
			<div class="grid gap-y-6 gap-x-4 sm:grid-cols-2">
				<div class="relative">
					<label for="firstName" class="sr-only">Card Holder</label>
					<div class="relative mtt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.singleCustomerIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="First name"
								name="firstName"
								id="firstName"
							/>
						</div>
					</div>
				</div>
				<div class="relative">
					<label for="cvccvv" class="sr-only">CVC/CVV</label>
					<div class="relative mtt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.cardIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="000"
								name="cvccvv"
								id="cvccvv"
							/>
						</div>
					</div>
				</div>
				<div class="relative">
					<label for="cardNumber" class="sr-only">Card number</label>
					<div class="relative mtt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.cardIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="00000000000"
								name="cardNumber"
								id="cardNumber"
							/>
						</div>
					</div>
				</div>
				<div class="relative">
					<label for="expiryDate" class="sr-only">Expiration Date</label>
					<div class="relative mtt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.cardIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="MM / YY"
								name="expiryDate"
								id="expiryDate"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Payment and Details -->
		<div class="space-y-8">
			<div class="space-y-6">
				<div class="space-y-3 pt-8">
					<h2 class="text-xl text-white leading-none font-medium flex gap-1">Billing address</h2>
					<p class="text-sm leading-none text-grey-2">Update your billing address.</p>
				</div>
				<div class="flex gap-2 text-white">
					<CheckBox
						labelClass="relative z-10 leading-none"
						id="buy-as-a-company"
						span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-6 before:absolute before:left-0"
						label="Buy as a company"
						classes="relative cursor-pointer "
					/>
				</div>
			</div>
			<!-- table -->
			<div class="grid gap-y-6 gap-x-4 sm:grid-cols-2">
				<div class="relative">
					<label for="company" class="sr-only">Company</label>
					<div class="relative mtt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.citySkyscrapersIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Name"
								name="company"
								id="company"
							/>
						</div>
					</div>
				</div>
				<div class="relative">
					<label for="vat" class="sr-only">VAT</label>
					<div class="relative mtt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.taxIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="ID"
								name="vat"
								id="vat"
							/>
						</div>
					</div>
				</div>

				<div class="relative col-span-2">
					<CheckBox
						labelClass="relative z-10 leading-none"
						id="same-address"
						span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-6 before:absolute before:left-0"
						label="Use the same address as in my personal account information."
						classes="relative cursor-pointer "
					/>
				</div>

				<div class="relative">
					<label for="firstName" class="sr-only">First name</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.singleCustomerIcon}
								stroke="transparent"
								class="w-5 h-5  text-white"
							/>
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="First name"
								name="firstName"
								id="firstName"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="firstName" class="sr-only">Last name</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.singleCustomerIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Last name"
								name="lastName"
								id="lastName"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="email" class="sr-only">Email</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.emailIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="email"
								placeholder="Email"
								name="email"
								id="email"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="street1" class="sr-only">Street 1</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.houseLineIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Street 1"
								name="street1"
								id="street1"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="streetNumber" class="sr-only">Number</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.signPostIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Number"
								name="streetNumber"
								id="streetNumber"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="street1" class="sr-only">Street 2</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.houseLineIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Street 2"
								name="street2"
								id="street2"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="zip" class="sr-only">ZIP Code</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.locationMarkerIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="ZIP Code"
								name="zip"
								id="zip"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="city" class="sr-only">City</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.citySkyscrapersIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="City"
								name="city"
								id="city"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="country" class="sr-only">Country</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.globalSearchIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Country"
								name="country"
								id="country"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="language" class="sr-only">Language</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.flagIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Country"
								name="language"
								id="language"
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="telephone" class="sr-only">Phone</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.telephoneIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="000-0000000-00"
								name="telephone"
								id="telephone"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Call to action buttons here -->
		<div class="pt-8 pb-4 gap-4 flex justify-end">
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
