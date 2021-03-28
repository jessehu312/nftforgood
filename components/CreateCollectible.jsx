import React, { useState } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { upload } from '@/lib/upload';
import { useAuth } from '@/lib/auth';
import { storage } from '@/lib/firebase';
import { addNewCollectible } from '@/lib/firestore';
import { useRouter } from 'next/router';
import { COLLECTIBLE_URL } from '@/lib/constants';
import Switch from 'react-switch';
import Loader from './common/Loader';

const CreateCollectible = () => {
  const [previewLoader, setPreviewLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState();
  const [charity, setCharity] = useState('');
  const [percent, setPercent] = useState('');
  const [bid, setBid] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  if (!process.browser || !user) {
    return null;
  }

  const handleFileInput = async (e) => {
    setPreviewLoader(true);
    const file = e.target.files[0];
    if (!file) return;

    const ref = storage.ref().child(`images/${Date.now()}`);

    ref.put(file, { contentType: 'image/png' }).then((data) => {
      data.ref.getDownloadURL().then((url) => {
        setFile(url);
        setPreviewLoader(false);
      });
    });
  };

  const Submit = () => {
    const form = {
      creatorId: user.uid,
      file: file,
      checked: checked,
      name: name,
      creatorName: user.name,
      desc: desc,
      price: price,
      charity: charity,
      percent: percent,
      bid: bid,
      creatorPhotoUrl: user.photoUrl
    };
    console.log(form);
    addNewCollectible(form).then((id) => {
      router.push(COLLECTIBLE_URL + id);
    });
  };

  return (
    <div className="bg-pri-indigo">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="flex flex-col justify-center mx-16 bg-pri-indigo">
          <h1 className="text-primary text-pri-yellow text-5xl font-bold mb-6 w-full">
            Create Collectible
          </h1>
          <div>
            <h2 className="inline-block text-white text-3xl mb-6 font-medium">
              Upload File
            </h2>
            <h2 className="inline-block text-white float-right text-3xl mb-6 font-medium">
              Preview
            </h2>
          </div>
          <div>
            <div className="inline-block mb-32 w-5/12">
              <label className="w-full transition-colors flex flex-col items-center px-4 py-6 bg-transparent text-blue rounded-lg shadow-lg tracking-wide uppercase border-4 border-blue cursor-pointer hover:text-white border-dashed py-12">
                <svg
                  className="text-white w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="text-white mt-2 text-base leading-normal">
                  Select a file
                </span>
                <input
                  onChange={handleFileInput}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
            {!previewLoader ? (
              <img
                src={file}
                className="rounded shadow inline-block object-contain max-w-64 max-h-64 float-right"
              />
            ) : (
              <div className="float-right">
                <Loader />
              </div>
            )}
          </div>
          <div>
            <h2 className="inline-block text-white text-3xl font-medium">
              Put on Sale
            </h2>
            <div className="inline-block ml-64">
              <Switch
                onChange={() => setChecked(!checked)}
                checked={checked}
                onColor="#73C3F9"
                onHandleColor="#FFBF2F"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
              />
            </div>
          </div>
          <h3 className="text-white text-opacity-50 mb-8">
            You'll receive bids on this item
          </h3>
          <h2 className="text-white text-3xl font-medium mb-3">Name</h2>
          <input
            className="outline-none w-5/12 bg-pri-indigo mb-4 border-b text-white mb-8"
            placeholder="e.g. Keko Egg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h2 className="text-white text-3xl mb-4 font-medium mb-3">
            Description
          </h2>
          <input
            className="outline-none w-5/12 bg-pri-indigo mb-6 border-b text-white break-all"
            placeholder="e.g. Rare egg that contains something you've never thought to exist."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <h2 className="text-white text-3xl mb-4 font-medium">Price</h2>
          <div className="mb-12">
            <input
              className="w-1/5 rounded-md pl-2 py-2"
              placeholder="0.02"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="inline-block ml-4 text-white font-medium">ETH</p>
          </div>
          <h2 className="text-white text-3xl mb-4 font-medium">
            Donate to Charity
          </h2>
          <input
            list="charities"
            className="w-5/12 rounded-md mb-12 pl-2 py-2"
            placeholder="Name of Charity"
            value={charity}
            onChange={(e) => setCharity(e.target.value)}
          />
          <datalist id="charities">
            <option value="Friends of Animals" />
            <option value="National Council on Aging" />
            <option value="Feeding America" />
            <option value="International Medical Corps" />
            <option value="ChildFund International" />
            <option value="Food and Water Watch" />
            <option value="Conservation International Foundation" />
            <option value="World Resources Institute" />
            <option value="Food Bank For New York City" />
            <option value="Mental Health America (MHA)" />
          </datalist>
          <h2 className="text-white text-3xl mb-4 font-medium">
            Donation Percentage
          </h2>
          <div>
            <input
              className="w-1/5 rounded-md mb-12 pl-2 py-2"
              placeholder="10"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
            />
            <p className="inline-block ml-4 text-white font-medium">
              % (min. 10)
            </p>
          </div>
          <h2 className="text-white text-3xl mb-4 font-medium">
            Duration of Bid
          </h2>
          <div>
            <input
              className="w-1/5 rounded-md mb-12 pl-2 py-2"
              placeholder="1"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
            <p className="inline-block ml-4 text-white font-medium">Day(s)</p>
          </div>
          <button
            onClick={Submit}
            className="text-pri-indigo font-bold bg-pri-yellow w-36 h-10 rounded-2xl mb-24"
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateCollectible;
