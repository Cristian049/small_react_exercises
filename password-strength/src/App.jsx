import { useState } from "react";
import Form from "./Form";

function App() {
  const [isPassword, setIsPassword] = useState(true);
  function handleIsPassword() {
    setIsPassword((isPassword) => !isPassword);
  }
  return (
    <div className="main">
      <Form isPassword={isPassword} handleIsPassword={handleIsPassword} />
    </div>
  );
}

export default App;
