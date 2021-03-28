import firebase, { firestore } from './firebase';

const users = firestore.collection('users');
const collectibles = firestore.collection('collectibles');

export async function createUser(uid, data) {
  const query = await users.doc(uid).get();

  if (query.exists) {
  }
  let payload = { uid, ...data };

  await users.doc(uid).set(payload, { merge: true });

  return { ...query.data(), ...payload };
}

export async function getUser(uid) {
  const documentRef = firestore.collection('users').doc(uid);
  const snapshot = await documentRef.get();
  return snapshot.data();
}

export async function getAllCollectibles() {
  const types = {
    all: await collectibles.limit(12).get(),
    art: await collectibles.where('type', '==', 'art').limit(12).get(),
    photography: await collectibles
      .where('type', '==', 'photography')
      .limit(12)
      .get(),
    game: await collectibles.where('type', '==', 'game').limit(12).get(),
    meme: await collectibles.where('type', '==', 'meme').limit(12).get()
  };

  Object.keys(types).map((type) => {
    const items = [];
    types[type].forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    types[type] = items;
  });

  return types;
}

export async function getSomeCollectibles() {
  const types = {
    all: await collectibles.orderBy('views', 'desc').limit(9).get()
  };

  Object.keys(types).map((type) => {
    const items = [];
    types[type].forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    types[type] = items;
  });

  return types;
}

export async function getProfileIds() {
  const paths = [];
  const all = await users.get();

  all.forEach((doc) =>
    paths.push({
      params: { userId: doc.id }
    })
  );
  return paths;
}

export async function getCollectibleIds() {
  const paths = [];
  const all = await collectibles.get();

  all.forEach((doc) =>
    paths.push({
      params: { id: doc.id }
    })
  );
  return paths;
}

export async function getCollectible(collectibleId) {
  const query = await collectibles.doc(collectibleId).get();
  return query.data();
}

export const decrementCoinResource = async (uid) => {
  const increment = firebase.firestore.FieldValue.increment(-1);
  const documentRef = firestore.collection('users').doc(uid);

  documentRef.update({ goodCoins: increment });
};

export async function getUserCollectibles(uid) {
  const queries = await collectibles.where('creatorId', '==', uid).get();

  const types = {
    all: [],
    sale: []
  };

  queries.forEach((doc) => {
    if (doc.data()['fiatPrice']) {
      types.sale.push({ ...doc.data(), id: doc.id });
    }
    types.all.push({ ...doc.data(), id: doc.id });
  });
  return types;
}

export async function addNewCollectible(form) {
  const payload = {
    charityName: form.charity,
    creatorId: form.creatorId,
    creatorName: form.creatorName,
    creatorPhotoUrl: form.creatorPhotoUrl,
    description: form.desc,
    fiatPrice: form.price + 'ETH',
    img: form.file,
    inStock: 1,
    name: form.name,
    percentToCharity: form.percent + '%',
    totalQuantity: 1,
    type: 'art',
    views: 0
  };
  console.log('New Collectible', payload);
  const temp = await collectibles.add(payload);
  return temp.id;
}

export async function incrementViews(collectibleId) {
  const increment = firebase.firestore.FieldValue.increment(1);
  const ref = collectibles.doc(collectibleId);
  ref.update({ views: increment });
}
