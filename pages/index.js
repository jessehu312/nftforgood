import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFTForGood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen w-full flex flex-row justify-center items-center">
        <h1 className="text-3xl font-extrabold">Home Page</h1>
      </div>
    </div>
  );
}
