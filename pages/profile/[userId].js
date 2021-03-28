import { getProfileIds, getUser, getUserCollectibles } from '@/lib/firestore';
import ProfilePage from '@/components/ProfilePage';

export async function getStaticPaths() {
  const paths = await getProfileIds();
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  return {
    props: { collectibles: await getUserCollectibles(params.userId), user: await getUser(params.userId)},
    revalidate: 1
  }
}

export default function UserProfile(props) {
  return (
    <ProfilePage {...props} />
  );
}