import { ROOT_URL } from '@/lib/constants';
import Router from 'next/router';
import Image from 'next/image';

export default function LogoText({ showImage, hideText }) {
  return (
    <a onClick={() => Router.push(ROOT_URL)} className="cursor-pointer">
      <div className="lg:flex hidden flex-row justify-start items-center lg:pl-4">
        {showImage && <Image src="/images/logo.png" alt="me" width="50" height="50" />}
        {!hideText && <h1 className="lg:ml-2 font-bold text-white text-3xl tracking-wide">
          NFT<span className="text-yellow-400">4</span>Good
        </h1>}
      </div>
      <div className="lg:hidden flex flex-row items-center space-x-2">
        {showImage && <Image src="/images/logo.png" alt="me" width="50" height="50" />}
        {!hideText && <h1 className="lg:ml-2 font-bold text-white text-3xl tracking-wide">
          NFT<span className="text-yellow-400">4</span>Good
        </h1>}
      </div>
    </a>
  );
}
