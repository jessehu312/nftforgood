import Head from 'next/head';
import Header from '@/components/home/Header';
import CharityList from '@/components/home/CharityList';
import CollectiblesList from '@/components/home/CollectiblesList';
import Banner from '@/components/home/Banner';
import Footer from '@/components/home/Footer';
import { getSomeCollectibles } from '@/lib/firestore';

export async function getStaticProps(context) {
  return {
    props: await getSomeCollectibles(), // will be passed to the page component as props
  }
}

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>NFT4Good</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <CharityList />
      <CollectiblesList {...props}/>
      <Banner />
      <Footer />
    </div>
  );
}
