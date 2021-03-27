import { firestore } from '@/lib/firebase';

const collectiblesStore = firestore.collection('collectibles');

export default async (req, res) => {
  const snapshot = await collectiblesStore.get();
  const collectibleList = [];

  snapshot.forEach((doc) => {
    collectibleList.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ collectibleList });
};