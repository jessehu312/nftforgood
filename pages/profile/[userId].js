import { getProfileIds, getUserCollectibles } from '@/lib/firestore';
import ProfilePage from '@/components/ProfilePage';

export async function getStaticPaths() {
  const paths = await getProfileIds();
  console.log({ paths, fallback: false });
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  return {
    props: await getUserCollectibles(params.userId),
    revalidate: 1
  }
}

export default function UserProfile(props) {
  console.log(props)
  return (
    <ProfilePage {...props} />
  );
}