<script lang="ts">
    import { createAvatar } from '@dicebear/core';
    import { identicon } from '@dicebear/collection';
    import { Collection, SignedIn } from 'sveltefire';
    import { Card, Button, Alert } from 'flowbite-svelte';
    import { getRandomQuote } from '../lib/quotes';
    import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
    import { getFirestore, doc, setDoc, serverTimestamp, query, collection, orderBy, limit, onSnapshot } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    import { onMount, onDestroy } from 'svelte';

    const avatar = (uid:string)=>{
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	}
    const db = getFirestore();
    const auth = getAuth();
    let intervalId : any;

    const date = new Date();
    const hours = date.getHours();
    let greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
    const quote = getRandomQuote();

    async function updateAvailability() {
        const user = auth.currentUser;
        if (user) {
            const counselorRef = doc(db, `counselor/${user.uid}`);
            await setDoc(counselorRef, { available: serverTimestamp(), username: user.displayName }, { merge: true });
        }
    }

    onMount(() => {
        updateAvailability();
        intervalId = setInterval(updateAvailability, 30000);
    });

	// get Distinct UIDs from chats
	const duids = (data:any) => {
		let id: string[] = []
		let dataar: any[] = []
		console.log(data)

		for (let i in data){
			if(id.includes(data[i].chatuid)){
				continue
			} else {
				id.push(data[i].chatuid)
				dataar.push({
					chatuid: data[i].chatuid
				})
			}
		}

		console.log(dataar)

		return dataar
	}
</script>

<SignedIn let:user>
    <div class="flex flex-col items-center justify-center gap-4 overflow-y-scroll pb-24 md:grid md:grid-cols-3 md:pt-16">
        <!-- Existing Welcome Card, Alert, Quotes, and Navigation Buttons -->
		<div
			class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="flex flex-col items-center pb-10 pt-10">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="mb-3 h-24 w-24 rounded-full shadow-lg" src={avatar(user.uid)} alt="Profile image" />
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

        <!-- Chats Section, showing all distinct chats -->
		<Collection ref={`counselor/${user.uid}/chats`} let:data let:count>
        {#each duids(data) as chat}
            <div class="border w-full rounded-lg p-4 shadow-sm bg-white flex flex-col gap-4">
                <div class="flex w-full flex-row justify-between items-center gap-4">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="h-8 w-8 rounded-full bg-white" src={avatar(chat.chatuid)} alt="User image" />
                <h2 class="text-xs font-semibold text-wrap">{chat.chatuid}</h2>
                
                </div>
                <div class="flex w-full flex-row justify-between items-center gap-4">

					<p class="text-gray-600">Status: Available</p>
				<a href={`/gethelp/chat/${chat.chatuid}`} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Connect
                </a>
			</div>
                
            </div>
        {/each}
        {#if count === 0}
            <p>No chats available at the moment.</p>
        {/if}
		</Collection>
    </div>
</SignedIn>
