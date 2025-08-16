export default function NotFound() {
  return (
    <section className="error-page">
      <h2>404 - Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <a href="/" className="button">На главную</a>
    </section>
  );
}