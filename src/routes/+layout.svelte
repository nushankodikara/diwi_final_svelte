<script lang="ts">
	import '../app.pcss';
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { fbApp } from '$lib';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';

	import { BottomNav, BottomNavItem } from 'flowbite-svelte';
	import {
		HomeSolid,
		WalletSolid,
		LandmarkSolid,
		UserEditSolid,
		AdjustmentsVerticalOutline,
		ArrowRightToBracketOutline,
		UserCircleSolid,
		ArrowLeftToBracketSolid
	} from 'flowbite-svelte-icons';

	// Initialize Firebase

	const firestore = getFirestore(fbApp);
	const auth = getAuth(fbApp);
</script>

<FirebaseApp {auth} {firestore}>
	<slot />

	<BottomNav position="fixed" classInner="grid-cols-4">
		<SignedIn let:signOut>
			<BottomNavItem btnName="Home" href="/">
				<HomeSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Journal" href="/journal">
				<WalletSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<!-- <BottomNavItem btnName="Speeches" href="/speeches">
				<LandmarkSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem> -->

			<BottomNavItem btnName="Profile" href="/profile">
				<UserCircleSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Log Out" on:click={signOut}>
				<ArrowRightToBracketOutline
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
		</SignedIn>
		<SignedOut>
			<BottomNavItem btnName="Home" href="/">
				<HomeSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Speeches" href="/speeches">
				<LandmarkSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Log In" href="/login">
				<ArrowLeftToBracketSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Sign Up" href="/signup">
				<UserEditSolid
					class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
		</SignedOut>
	</BottomNav>
</FirebaseApp>
