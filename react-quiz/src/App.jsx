import Header from "./Header";
import MainCont from "./MainCont";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <MainCont>
        <p>1/15</p>
        <p>questions</p>
      </MainCont>
    </div>
  );
}
