import { useState } from "react";
import "./Form.css";
export default function Form({ handleAddItems }) {
  const array = Array.from({ length: 20 }, (_, i) => i + 1);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleQuantity(e) {
    setQuantity(Number(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      return;
    }
    setDescription("");
    setQuantity(1);
    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItems(newItem);
  }

  function handleChange(e) {
    setDescription(e.target.value);
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={handleQuantity}>
        {array.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleChange}
      />
      <button>ADD</button>
    </form>
  );
}
