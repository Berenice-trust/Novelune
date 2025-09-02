"use client";
import WelcomeSection from '../components/WelcomeSection';
import { useUser } from '../hooks/useUser';

export default function HomePage() {
  const { user, loading } = useUser();

  return (
    <main>
       <WelcomeSection user={user} loading={loading} />
    </main>
  );
}