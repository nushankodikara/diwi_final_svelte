<script>
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { SignedIn } from 'sveltefire';
	import { Card, Button, Alert } from 'flowbite-svelte';
	import { getRandomQuote } from '../lib/quotes';
	import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';

	const avatar = createAvatar(identicon, {
		seed: 'User',
		backgroundType: ['gradientLinear', 'solid']
	});

	const svg = avatar.toDataUriSync();

	// using time of day to determine the greeting
	const date = new Date();
	const hours = date.getHours();
	let greeting = '';
	if (hours < 12) {
		greeting = 'Good Morning';
	} else if (hours < 18) {
		greeting = 'Good Afternoon';
	} else {
		greeting = 'Good Evening';
	}

	const quote = getRandomQuote();
</script>

<SignedIn let:user>
	<div
		class="flex flex-col items-center justify-center gap-4 overflow-y-scroll pb-24 md:grid md:grid-cols-3 md:pt-16"
	>
		<!-- Welcome Card -->
		<div
			class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="flex flex-col items-center pb-10 pt-10">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="mb-3 h-24 w-24 rounded-full shadow-lg" src={svg} alt="Profile image" />
				<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.displayName}</h5>
				<span class="text-sm text-gray-500 dark:text-gray-400">{greeting}!</span>
				<div class="mt-4 flex md:mt-6">
					<a
						href="/profile"
						class="ms-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
						>Profile</a
					>
				</div>
			</div>
		</div>

		<Alert>
			<InfoCircleSolid slot="icon" class="h-4 w-4" />
			<span class="font-medium">Attention!</span>
			Please complete the on-boarding process for us to better understand you.
			<a href="/on-boarding" class="font-bold underline">Click Here</a>
		</Alert>

		<div
			class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
		>
			<figure
				class="flex flex-col items-center justify-center rounded-t-lg border-b border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800 md:rounded-t-none md:rounded-tl-lg md:border-e"
			>
				<blockquote class="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400">
					<p class="my-4 font-light">"{quote.QUOTE}"</p>
				</blockquote>
				<div class="space-y-0.5 text-left font-medium dark:text-white">
					<div>- {quote.AUTHOR} -</div>
				</div>
			</figure>
		</div>

		<!-- Other Sections buttons 2x2 -->
		<div
			class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
		>
			<h2 class="p-4 text-center text-xl font-medium text-gray-900 dark:text-white">
				We got your back!
			</h2>
			<div class="grid grid-cols-2 gap-4 p-4">
				<Button href="/journal">
					Journal <ArrowRightOutline class="ms-2 h-3.5 w-3.5" />
				</Button>
				<Button href="/speeches">
					Speeches <ArrowRightOutline class="ms-2 h-3.5 w-3.5" />
				</Button>
				<Button href="/status">
					Status Update <ArrowRightOutline class="ms-2 h-3.5 w-3.5" />
				</Button>
				<Button href="/gethelp">
					Get Help <ArrowRightOutline class="ms-2 h-3.5 w-3.5" />
				</Button>
			</div>
		</div>
	</div>
</SignedIn>
