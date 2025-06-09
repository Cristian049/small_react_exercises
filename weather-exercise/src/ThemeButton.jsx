export default function ThemeButton({ theme, onTheme }) {
  return (
    <button className={`theme-btn ${theme ? "" : "dark"}`} onClick={onTheme}>
      {theme ? "☀️ Light Mode" : "🌑 Dark Mode"}
    </button>
  );
}
