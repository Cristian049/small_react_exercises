import "./Stats.css";
export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="Stats">
        <em>Start adding some items to your packing list🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const persentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="Stats">
      <em>
        {persentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼You have ${numItems} items on your list, and you already packed
        ${numPacked} (${persentage}%)`}
      </em>
    </footer>
  );
}
