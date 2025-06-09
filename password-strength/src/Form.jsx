import { useEffect, useState } from "react";
import Hide from "./Hide.jsx";
import Show from "./Show.jsx";
const levels = {
  1: "Very Weak",
  2: "Weak",
  3: "Good",
  4: "Strong",
};
const checks = [/[a-z]/, /[A-Z]/, /[\d]/, /[!@#$%^&*?.,]/];

export default function Form({ isPassword, handleIsPassword }) {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [range, setRange] = useState(1);
  useEffect(
    function () {
      let score = checks.reduce((acc, rgx) => acc + rgx.test(password), 0);
      setStrength(levels[score]);
      setRange(score);
    },
    [password]
  );

  return (
    <>
      <div className="input-box">
        <input
          type={isPassword ? "password" : "text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleIsPassword}>
          {isPassword ? <Show /> : <Hide />}
        </button>
      </div>

      <div className={`strength level-${range}`}>
        <p>{strength}</p>
      </div>
    </>
  );
}
