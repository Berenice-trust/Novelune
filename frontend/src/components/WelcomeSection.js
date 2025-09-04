"use client";
import AuthButtons from './AuthButtons';
import { useUser } from '../hooks/useUser';

export default function WelcomeSection() {
  const { user } = useUser();
  
  return (
    <section className="welcome">
      <h2>Добро пожаловать</h2>
      {user ? (
        <p>
          Уважаемый {user.display_name || user.username},<br />
          Здесь вы можете публиковать свои книги и рассказы, а также читать произведения других авторов.
        </p>
      ) : (
        <>
          <p>
            Здесь вы можете публиковать свои книги и рассказы, а также читать произведения других авторов.
          </p>
          <AuthButtons />
        </>
      )}
    </section>
  );
}