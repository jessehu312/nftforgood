import { firestore } from './firebase';

const users = firestore.collection('users');

export async function createUser(uid, data) {
  const query = await users.doc(uid).get();

  if (query.exists) {
  }
  let payload = { uid, ...data };

  await users.doc(uid).set(payload, { merge: true });

  return { ...query.data(), ...payload };
}

export async function getUser(uid) {
  const query = await users.doc(uid).get();
  return query.data();
}

const collectibles = firestore.collection('collectibles');

export async function getAllCollectibles() {
  const types = {
    all: await collectibles.limit(12).get(),
    art: await collectibles.where('type', '==', 'art').limit(12).get(),
    photography: await collectibles.where('type', '==', 'photography').limit(12).get(),
    games: await collectibles.where('type', '==', 'games').limit(12).get(),
    memes: await collectibles.where('type', '==', 'memes').limit(12).get()
  };

  Object.keys(types).map(type => { 
    const items = []
    types[type].forEach(doc => items.push(doc.data()));
    types[type] = items;
  })

  return types;
}

export async function getSomeCollectibles() {
  const types = {
    all: await collectibles.limit(9).get(),
  };

  Object.keys(types).map(type => { 
    const items = []
    types[type].forEach(doc => items.push(doc.data()));
    types[type] = items;
  })

  return types;
}