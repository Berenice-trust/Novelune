import AuthButtons from './AuthButtons';

export default function WelcomeSection({ user }) {
  return (
    <section className="welcome">
      <h2>Добро пожаловать</h2>
      <p>
        Здесь вы можете публиковать свои книги и рассказы, а также читать произведения других авторов.
      </p>
      {!user && <AuthButtons />}
    </section>
  );
}