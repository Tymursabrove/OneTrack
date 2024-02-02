<script>
	 
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	 
</script>

<div class="relative">
    <div class="space-y-10 divide-y divide-grey">
        <div class="space-y-8 pt-8">
            <div class="space-y-5">
                <h1 class="text-2xl font-bold text-white ">Notifications</h1>
                <div class="space-y-3">
                    <h2 class="text-xl text-white leading-none font-medium flex gap-1">
                        Security Alerts
                    </h2>
                    <p class="text-sm leading-none text-grey-2">
                        You’re not able to switch off these alerts. This is for your own safety.
                    </p>
                </div>
            </div>
            <div class="flex justify-between gap-5">
                <div class="space-y-3 flex-1">
                    <h3 class="text-sm text-white leading-none font-medium flex gap-1">
                        Someone has been added to your workspace
                    </h3>
                    <p class="text-sm leading-none text-grey-2">
                        When a new person is added to your workspace you’ll be notified.
                    </p>
                </div>
                <div class="relative">

                    <CheckBox					 
					labelClass="relative z-10 leading-none"
					label=""
					id="workspaceAdding"
					classes="relative cursor-pointer"
					span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
					/> 

                    
                </div>
            </div>
            <div class="flex justify-between gap-5">
                <div class="space-y-3 flex-1">
                    <h3 class="text-sm text-white leading-none font-medium flex gap-1">
                        Login from new device
                    </h3>
                    <p class="text-sm leading-none text-grey-2">
                        Get a notification whenever someone logs into your account from a new
                        device.
                    </p>
                </div>
                <div class="relative">                    
                    <CheckBox					 
					labelClass="relative z-10 leading-none"
					label=""
					id="newDeviceLogin"
					classes="relative cursor-pointer"
					span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
					/> 
                    
                </div>
            </div>
            <div class="flex justify-between gap-5">
                <div class="space-y-3 flex-1">
                    <h3 class="text-sm text-white leading-none font-medium flex gap-1">
                        2-Factor-Authentication has been enabled/disabled
                    </h3>
                    <p class="text-sm leading-none text-grey-2">
                        When the status of your 2-Factor-Authentication changes we’ll contact you.
                    </p>
                </div>
                <div class="relative">
                    <CheckBox					 
					labelClass="relative z-10 leading-none"
					label=""
					id="authentication2Factors"
					classes="relative cursor-pointer"
					span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
					/>  
                </div>
            </div>
        </div>
        <div class="space-y-8 pt-10">
           
                <div class="space-y-5">
                    <h2 class="text-xl text-white leading-none font-medium flex gap-1">
                        Account Activity
                    </h2>
                    
                </div>
        
        
            
          
            <div class="flex justify-between gap-5">
                
                <div class="space-y-5 flex-1">
                    <h3 class="text-sm text-white leading-none font-medium flex gap-1">
                        Email me when:
                    </h3>
                    <div class="space-y-3 flex-1">
                    <h3 class="text-sm text-white leading-none font-medium flex gap-1">
                        Ad status information
                    </h3>
                    <p class="text-sm leading-none text-grey-2">
                        Get notified when your ROAS changes from good to poor and vice versa.
                    </p>
                </div>
                </div>
                <div class="relative">
                    <CheckBox					 
					labelClass="relative z-10 leading-none"
					label=""
					id="adStatsInfo"
					classes="relative cursor-pointer"
					span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
					/>  
                    
                </div>
            </div>
            <div class="flex justify-between gap-5">
                <div class="space-y-3 flex-1">
                    <h3 class="text-sm text-white leading-none font-medium flex gap-1">
                        ROAS is positive the last 24h
                    </h3>
    
                </div>
                <div class="relative">
                    <CheckBox					 
					labelClass="relative z-10 leading-none"
					label=""
					id="roas"
					classes="relative cursor-pointer"
					span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
					/>  
                     
                </div>
            </div>
        </div>
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

 



