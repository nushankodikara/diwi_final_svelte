<script lang="ts">
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Alert, Label, Input } from 'flowbite-svelte';
	import { SignedIn, SignedOut } from 'sveltefire';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let userData = {
		email: '',
		password: ''
	};

	let error = {
		status: false,
		message: '',
		title: ''
	};

	const phraseData = (auth: any) => {
		if (userData.password.length < 6) {
			error = {
				status: true,
				message: 'Password must be at least 6 characters long',
				title: 'Error!'
			};
		} else if (userData.email === '') {
			error = {
				status: true,
				message: 'Email is required',
				title: 'Error!'
			};
		} else if (userData.email.indexOf('@') === -1) {
			error = {
				status: true,
				message: 'Email is invalid',
				title: 'Error!'
			};
		} else {
			error = {
				status: false,
				message: '',
				title: ''
			};
		}

		try {
			signInWithEmailAndPassword(auth, userData.email, userData.password);
		} catch {
			error = {
				status: true,
				message:
					'An error occurred while creating your account. Please check whether you already have an account with this email address.',
				title: 'Error!'
			};
		}
	};
</script>

<SignedOut let:auth>
	<div class="min-w-screen flex min-h-screen flex-col items-center justify-center">
		<div class="mx-4 w-full max-w-2xl">
			<Section name="login">
				<Register href="/">
					<svelte:fragment slot="top">
						<!-- <img class="mr-2 h-8 w-8" src="/images/logo.svg" alt="logo" /> -->
						Flowbite
					</svelte:fragment>
					<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
						<form
							on:submit={(e) => {
								e.preventDefault();
								phraseData(auth);
							}}
							class="flex flex-col space-y-6"
							action="/"
						>
							<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Log In</h3>
							{#if error.status}
								<Alert color="red">
									<span class="font-medium">{error.title}</span>
									{error.message}
								</Alert>
							{/if}
							<Label class="space-y-2">
								<span>Your email</span>
								<Input
									type="email"
									name="email"
									bind:value={userData.email}
									placeholder="name@company.com"
									required
								/>
							</Label>
							<Label class="space-y-2">
								<span>Your password</span>
								<Input
									type="password"
									name="password"
									bind:value={userData.password}
									placeholder="•••••"
									required
								/>
							</Label>
							<div class="flex items-start">
								<!-- <Checkbox>Remember me</Checkbox> -->
								<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
									>Forgot password?</a
								>
							</div>
							<Button type="submit" class="w-full1">Sign in</Button>
							<p class="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet? <a
									href="/signup"
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>Sign up</a
								>
							</p>
						</form>
					</div>
				</Register>
			</Section>
		</div>
	</div>
</SignedOut>

<SignedIn let:signOut>
	<div class="flex h-screen w-screen items-center justify-center">
		<div class="max-w-2xl">
			<Alert color="green">You have successfully signed in.</Alert>
			<!-- Links for Home and signout with tailwind styles -->
			<div class="m-4 flex justify-center space-x-4">
				<a href="/" class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					>Home</a
				>
				<a
					href="#"
					on:click={signOut}
					class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">Sign Out</a
				>
			</div>
		</div>
	</div>
</SignedIn>
