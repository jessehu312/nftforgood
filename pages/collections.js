import CollectiblesFilter from "@/components/home/CollectiblesFilter";
import { getAllCollectibles } from '@/lib/firestore';

export async function getStaticProps(context) {
  return {
    props: await getAllCollectibles(), // will be passed to the page component as props
  }
}

export default function CollectibleList(props) {
  return (
    <CollectiblesFilter {...props}/>
  );
}