import firebase, { firestore, storage } from '@/lib/firebase';

const files = firestore.collection("files");

export const upload = async(file) => {
  try {
    console.log('upload');

    /*const fbUser = firebase.auth.currentUser;
    if (!fbUser) {
      throw 'Not logged in';
    }*/

    //const fileName = `${new Date().getTime()}-${file.name}`;

    const uploadTask = storage.ref().child(/*`files/${fbUser.email}/${fileName}`*/file.name).put(file);
    const snapshot = await uploadTask;
    const downloadUrl = await snapshot.ref.getDownloadURL();
    console.log(`downloadUrl: ${downloadUrl}`);

    /* await files
      .doc(fileName)
      .set({ owner: fbUser.email, path: downloadUrl })

    await users.doc(fbUser.email).update({
      files: firebase.firestore.FieldValue.arrayUnion(downloadUrl)
    }); */
    return downloadUrl;
  } catch (error) {
    console.error(error)
    throw error
  }
};