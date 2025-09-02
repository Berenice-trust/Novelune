import AuthButtons from './AuthButtons';
// import { useUser } from './UserContext';

export default function WelcomeSection({ user }) {
  console.log('WelcomeSection: received user =', user);
  
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