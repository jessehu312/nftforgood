import { firestore } from '@/lib/firebase';

const collectiblesStore = firestore.collection('collectibles');

export default async (req, res) => {
  const {
    query: { id: collectibleId }
  } = req;

  const query = await collectiblesStore.doc(collectibleId).get();

  if (!query.exists) {
    return res.status(404).send();
  }

  res.json({ collectible: query.data() });
};
