import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import serviceAccount from '../../../serviceAccountKey.json';

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const firestore = getFirestore(app);

export const rosterRef = firestore.collection('Unity').doc('roster');
