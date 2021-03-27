import Head from 'next/head';
import Header from '@/components/home/Header';
import CharityList from '@/components/home/CharityList';
import CollectiblesList from '@/components/home/CollectiblesList';
import Banner from '@/components/home/Banner';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFT4Good</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <CharityList />
      <CollectiblesList />
      <Banner />
      <Footer />
    </div>
  );
}
