import Accordion from "./Accordion";
import "./index.css";
const faqs = [
  {
    title: "Where are these chairs assambled?",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, labore delectus nobis hic libero inventore?",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, labore delectus nobis hic libero inventore?",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, labore delectus nobis hic libero inventore?",
  },
];

function App() {
  return (
    <div>
      <Accordion faqs={faqs} />
    </div>
  );
}

export default App;
