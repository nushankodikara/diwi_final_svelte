<script>
	import { Card, Button, Label, Input, Select, Toggle, Range } from 'flowbite-svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { SignedIn } from 'sveltefire';
	const answers = {
		q1: '',
		q2: '',
		q3: 1,
		q4: '',
		q5: ''
	};

	let q2t = false;
	let q4t = false;

	let reasons = [
		{ value: 'anxiety', name: 'Anxiety' },
		{ value: 'depression', name: 'Depression' },
		{ value: 'stress', name: 'Stress Management' },
		{ value: 'suicide', name: 'Suicidal Thoughts' },
		{ value: 'other', name: 'Other' }
	];

	let step = 1;

	const stepIncrement = () => {
		step += 1;
	};
</script>

<Toaster />

<div class="flex min-h-screen w-full flex-col items-center justify-center p-4">
	<SignedIn>
		{#if step == 1}
			<Card>
				<div class="flex flex-col space-y-6">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white">Onboarding</h3>
					<Label class="space-y-2">
						<span>What is your primary reason for using this application?</span>
						<Select class="mt-2" items={reasons} bind:value={answers.q1} />
					</Label>
					<Button
						on:click={() => {
							if (answers.q1 == '') {
								toast.error('Please Select an Option');
								return 0;
							}
							stepIncrement();
						}}
						class="w-full">Next Step</Button
					>
				</div>
			</Card>
		{:else if step == 2}
			<Card>
				<div class="flex flex-col space-y-6">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white">Onboarding</h3>
					<Label class="space-y-2">
						<span>Have you been diagnosed with any specific mental health condition?</span>
						<Toggle
							size="large"
							on:change={() => {
								q2t = !q2t;
							}}>{q2t ? 'Yes' : 'No'}</Toggle
						>
						{#if q2t}
							<Input class="mt-2" placeholder="Please Specify" bind:value={answers.q2} />
						{/if}
					</Label>
					<Button
						on:click={() => {
							if (q2t && answers.q2 == '') {
								toast.error('Please Specify');
								return 0;
							}
							stepIncrement();
						}}
						class="w-full">Next Step</Button
					>
				</div>
			</Card>
		{:else if step == 3}
			<Card>
				<div class="flex flex-col space-y-6">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white">Onboarding</h3>
					<Label class="space-y-2">
						<span>On a scale of 1-10, how would you rate the severity of your symptoms?</span>
						<span class="text-xs text-gray-500 dark:text-gray-400"
							>1 being the least severe and 10 being the most severe</span
						>
						<br />
						<span class="w-full text-center">{'Level of :' + answers.q3}</span>
						<Range id="range-minmax" min="1" max="10" bind:value={answers.q3} />
					</Label>
					<Button
						on:click={() => {
							if (q2t && answers.q2 == '') {
								toast.error('Please Specify');
								return 0;
							}
							stepIncrement();
						}}
						class="w-full">Next Step</Button
					>
				</div>
			</Card>
		{:else if step == 4}
			<Card>
				<div class="flex flex-col space-y-6">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white">Onboarding</h3>
					<Label class="space-y-2">
						<span
							>Have you received any previous treatment or support for your mental health concerns?</span
						>
						<Toggle
							size="large"
							on:change={() => {
								q4t = !q4t;
							}}>{q4t ? 'Yes' : 'No'}</Toggle
						>
						{#if q4t}
							<Input class="mt-2" placeholder="Please Specify" bind:value={answers.q4} />
						{/if}
					</Label>
					<Button
						on:click={() => {
							if (q4t && answers.q4 == '') {
								toast.error('Please Specify');
								return 0;
							}
							stepIncrement();
						}}
						class="w-full">Next Step</Button
					>
				</div>
			</Card>
		{:else if step == 5}
			<Card>
				<div class="flex flex-col space-y-6">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white">Onboarding</h3>
					<Label class="space-y-2">
						<span
							>Is there any additional information you would like to provide that could help us
							better understand your needs and tailor the support accordingly? (Optional)</span
						>
						<Input type="text" bind:value={answers.q5} />
					</Label>
					<Button
						on:click={() => {
							if (answers.q5 == '') {
								toast.error('Please Specify');
								return 0;
							}
							stepIncrement();
						}}
						class="w-full">Next Step</Button
					>
				</div>
			</Card>
		{:else}
			<Card>
				<div class="flex flex-col space-y-6">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white">Onboarding</h3>
					<Label class="space-y-2">
						<span>Thank you for completing the onboarding process</span>
					</Label>
					<Button
						on:click={() => {
							console.log(answers);
						}}
						class="w-full">Submit</Button
					>
				</div>
			</Card>
		{/if}
	</SignedIn>
</div>
