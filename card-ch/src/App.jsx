import "./App.css";
import Avatar from "./Avatar";
import Intro from "./Intro";
import SkillList from "./SkillList";
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

export default App;
