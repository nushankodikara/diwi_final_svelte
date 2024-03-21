<script lang="ts">
    import { onMount } from 'svelte';
    import { collection, query, where, getFirestore, getDocs, orderBy, limit } from 'firebase/firestore';
    import { app } from '$lib/firebase'; // Ensure this path correctly points to your Firebase configuration

    let counselors: string | any[] = [];
    const db = getFirestore(app);

    async function fetchCounselors() {
        const now = new Date();
        const tenMinutesAgo = new Date(now.getTime() - 10 * 60000);

        const counselorsRef = collection(db, 'counselor');
        const q = query(
            counselorsRef,
            where('available', '>', tenMinutesAgo),
            orderBy('available', 'desc'),
            limit(20) // Adjust the limit as needed
        );

        const querySnapshot = await getDocs(q);
        counselors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    const counselorDisplayName = (counselor: any) => {
        console.log(counselor)
        return counselor.username;
    };

// get User displayname from ID


    onMount(() => {
        fetchCounselors();
        // Consider setting up a real-time listener or periodically refreshing the list
    });
</script>

<main class="p-4">
    <h1 class="text-2xl font-bold">Available Counselors</h1>
    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each counselors as counselor}
            <div class="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-4">
                <div class="flex flex-row justify-between items-center">
                <h2 class="text-xl font-semibold">{counselorDisplayName(counselor)}</h2>
                <a href={`/gethelp/chat/${counselor.id}`} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Connect
                </a>
                </div>
                <p class="text-gray-600">Status: Available</p>
                
            </div>
        {/each}
        {#if counselors.length === 0}
            <p class="text-gray-500">No counselors available at the moment.</p>
        {/if}
    </div>
</main>
