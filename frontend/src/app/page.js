import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeSection from '../components/WelcomeSection';

export default function HomePage() {
  const user = null; // или объект пользователя, если авторизован

  return (
    <>
      <Header />
      <main>
        <WelcomeSection user={user} />
      </main>
      <Footer />
    </>
  );
}