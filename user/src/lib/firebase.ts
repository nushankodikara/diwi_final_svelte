import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';

export const app = initializeApp({
	apiKey: 'AIzaSyDOPwqqMYwDeskIX-tJEn9JavBNonFnJYA',
	authDomain: 'finalproject-28368.firebaseapp.com',
	projectId: 'finalproject-28368',
	storageBucket: 'finalproject-28368.appspot.com',
	messagingSenderId: '269091379492',
	appId: '1:269091379492:web:975fc047207f227511fbb1',
	measurementId: 'G-CPTZ9B1BEK'
});

export const setOnboardingProcess = async (UID: string) => {
	const db = getFirestore(app);
	const docRef = doc(db, 'details', UID);
	await setDoc(docRef, { onboarding: true });
};

// Check /details/uid has onboarding : true
export const checkOnboardingProcess = async (UID: string) => {
	const db = getFirestore(app);
	const docRef = doc(db, 'details', UID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		if (data) {
			return data.onboarding?.toString() === 'true';
		}
	}
	return false;
};

export interface Speech {
	title: string;
	link: string;
	description: string;
	created: string;
}

export const getSpeeches = async () => {
	const db = getFirestore(app);
	const querySnapshot = await getDocs(collection(db, 'speeches'));
	const speeches: Speech[] = [];
	// biome-ignore lint/complexity/noForEach: <explanation>
	querySnapshot.forEach((doc) => {
		speeches.push(doc.data() as Speech);
	});
	return speeches;
};
