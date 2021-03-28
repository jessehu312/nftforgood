import { storage } from '@/lib/firebase';

export const uploadImageToStorage = async (data) => {
  const ref = storage.ref().child(`images/${Date.now()}`);

  ref.put(data, { contentType: 'image/png' }).then((data) => {
    data.ref.getDownloadURL().then((url) => {
      console.log('url', url);
      return url;
    });
  });
};
