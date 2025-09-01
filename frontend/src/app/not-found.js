import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="error-page">
      <h2>404 - Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <Link href="/" className="button">На главную</Link>
    </section>
  );
}