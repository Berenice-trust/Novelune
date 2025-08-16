export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <p>&copy; {currentYear} Novelune</p>
      </div>
    </footer>
  );
}