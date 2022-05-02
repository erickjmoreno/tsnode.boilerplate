import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';
const app = initializeApp({
    credential: cert('../serviceAccountKey.json'),
});
const firestore = getFirestore(app);
export const rosterRef = firestore.collection('Unity').doc('roster');
