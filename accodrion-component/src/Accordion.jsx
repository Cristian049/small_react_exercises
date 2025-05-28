import { useState } from "react";
import "./index.css";
import Item from "./Item";
export default function Accordion({ faqs }) {
  const [currOpen, setCurrOpen] = useState(1);
  return (
    <div className="accordation">
      {faqs.map((faq, i) => (
        <Item
          currOpen={currOpen}
          key={i}
          title={faq.title}
          num={i}
          onOpen={setCurrOpen}
        >
          {faq.text}
        </Item>
      ))}
      <Item
        currOpen={currOpen}
        key="test1"
        title="Test 1"
        num={22}
        onOpen={setCurrOpen}
      >
        <p>Allows React developers to:</p>
        <ul></ul>
        <li> Break up UI into components</li>{" "}
        <li> Make components reusuable</li> <li> Place state efficiently</li>
      </Item>
    </div>
  );
}
