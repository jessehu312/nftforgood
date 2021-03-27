import ProfilePage from "@/components/ProfilePage";
import { getUserCollectibles } from '@/lib/firestore';

export async function getStaticProps({ params }) {
  return {
    props: await getUserCollectibles('dOJ0mjd1lyL1IUWybfQAissCJ972'),
    revalidate: 1
  }
}

export default function Profile(props) {
  return (
    <ProfilePage {...props} />
  );
}