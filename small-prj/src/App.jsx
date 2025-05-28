import { useState } from "react";

const initialItems = [
  {
    id: 1,
    name: "Banane",
    quantity: 11,
    packed: false,
  },
  {
    id: 2,
    name: "Sosete",
    quantity: 2,
    packed: false,
  },
  {
    id: 3,
    name: "Hartie igienica",
    quantity: 6,
    packed: false,
  },
];

function App() {
  const [items, setItems] = useState([]);

  function handlePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  }

  function deleteItems(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleSetItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <AddForm onSetItems={handleSetItems} />
      <ItemsList
        items={items}
        onPacked={handlePacked}
        onDelete={deleteItems}
        onClearList={handleClearList}
      />
    </div>
  );
}

export default App;

function Header() {
  return (
    <div className="header">
      <h1>🧺Shopping List🧺</h1>
    </div>
  );
}

function AddForm({ onSetItems }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const array = Array.from({ length: 20 }, (_, i) => i + 1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    setName("");
    setQuantity(1);
    const newItem = { name, quantity, id: crypto.randomUUID(), packed: false };
    onSetItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What products you need to get</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {array.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="button">Add item</button>
    </form>
  );
}

function ItemsList({ items, onPacked, onDelete, onClearList }) {
  return (
    <div className="items-list">
      <ul>
        {items.map((item) => (
          <Item
            items={item}
            key={item.id}
            onPacked={onPacked}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <button onClick={onClearList} className="button">
        Clear List
      </button>
    </div>
  );
}

function Item({ items, onPacked, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        value={items.packed}
        onChange={(e) => onPacked(items.id)}
      />
      <p className={items.packed ? "checked" : ""}>
        {items.quantity} {items.name}
      </p>
      <button onClick={(e) => onDelete(items.id)}>❌</button>
    </li>
  );
}
