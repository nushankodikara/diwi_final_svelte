<script lang="ts">
    import { createAvatar } from '@dicebear/core';
    import { identicon } from '@dicebear/collection';
    import { Collection, SignedIn } from 'sveltefire';
    import { Card, Button, Alert } from 'flowbite-svelte';
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
    <div class="p-4 flex flex-col items-center justify-center gap-4 overflow-y-scroll pb-24 md:grid md:grid-cols-3 md:pt-16">
        <!-- Existing Welcome Card, Alert, Quotes, and Navigation Buttons -->
        <h2 class="text-2xl font-semibold text-white">Your Patients</h2>
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
				<a href={`/prescribe/write/${chat.chatuid}`} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Write Prescription
                </a>
			</div>
                
            </div>
        {/each}
        {#if count === 0}
            <p>No Patients available at the moment.</p>
        {/if}
		</Collection>
    </div>
</SignedIn>
