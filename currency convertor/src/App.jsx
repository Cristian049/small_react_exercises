import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleNumber(e) {
    setAmount(Number(e.target.value));
  }

  function handleSelect1(e) {
    setFromCur(e.target.value);
  }
  function handleSelect2(e) {
    setToCur(e.target.value);
  }

  useEffect(
    function () {
      if (!amount) {
        setAmount(1);
        return;
      }
      async function convert() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );
          const data = await res.json();
          setOutput(data.rates[toCur]);
          setIsLoading(false);
        } catch (e) {
          console.error(e);
        }
      }
      if (fromCur === toCur) return setOutput(amount);
      convert();
    },
    [amount, toCur, fromCur]
  );

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={handleNumber}
        disabled={isLoading}
      />
      <select onChange={handleSelect1} value={fromCur} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RON">RON</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={handleSelect2} value={toCur} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RON">RON</option>
        <option value="INR">INR</option>
      </select>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {output} {toCur}
        </p>
      )}
    </div>
  );
}

export default App;
