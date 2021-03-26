import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/home/Navbar';
import SocialSignIn from './SocialSignIn';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-hero-pattern h-screen-80">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
        <div className="flex flex-col md:flex-row justify-center lg:justify-between items-center flex-wrap md:py-0 py-16">
          <div className="w-full lg:max-w-xl pl-12">
            <div className="py-8">
              <div className="text-yellow-400 font-bold text-5xl pb-4">
                <h1 className="mb-2">A Revolutionary</h1>
                <h1>Donation Platform</h1>
              </div>
              <p className="text-left text-white text-2xl">
                Purchase digital assets while supporting charitable causes of
                your choice.
              </p>
            </div>
          </div>
          <img
            className="hidden lg:block md:w-120"
            src="/images/nft-box.png"
            alt="NFT Box"
          />
        </div>
      </div>
      {open && <SocialSignIn setOpen={setOpen} />}
    </div>
  );
};

export default Header;
