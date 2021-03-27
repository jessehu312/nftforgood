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
