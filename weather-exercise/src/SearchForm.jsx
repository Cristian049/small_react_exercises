export default function SearchForm({ city, setCity, theme }) {
  return (
    <input
      className={`search ${theme ? "" : "dark"}`}
      type="text"
      placeholder="Search location..."
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
  );
}
