import { rosterRef } from '@common/firebase';

const init = async () => {
  rosterRef.onSnapshot(async (doc) => {
    const rosterData = doc.data();
    console.log(rosterData);
  });
};

init();
