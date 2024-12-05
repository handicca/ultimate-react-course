/* eslint-disable react/prop-types */
export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <p>
          <em>Start adding some items to your packing list ✈️</em>
        </p>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `🧳 You have ${numItems} items on you list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
