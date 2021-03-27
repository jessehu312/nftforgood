import ProfilePage from "@/components/ProfilePage";
import { getUserCollectibles } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';
import { useEffect } from "react";
import { Router } from "next/router";
import { PROFILE_URL } from '@/lib/constants';

export async function getStaticProps({ params }) {
  return {
    props: await getUserCollectibles('dOJ0mjd1lyL1IUWybfQAissCJ972'),
    revalidate: 1
  }
}

export default function Profile(props) {
  const auth = useAuth();

  useEffect(
    () => {
      if (auth.user && auth.user.uid) {
        Router.push(PROFILE_URL + auth.user.uid);
      }
    },
    []
  );
  return (
    <ProfilePage {...props} />
  );
}