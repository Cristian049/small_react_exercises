const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
    id: 1,
  },
  {
    skill: "JavScript",
    level: "advanced",
    color: "#EFD81D",
    id: 2,
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#c3dcaf",
    id: 3,
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#e84f33",
    id: 4,
  },
  {
    skill: "React",
    level: "begginer",
    color: "#60dafb",
    id: 5,
  },
  {
    skill: "MongoDB",
    level: "intermediate",
    color: "green",
    id: 6,
  },
  {
    skill: "Node.Js",
    level: "advanced",
    color: "greenyellow",
    id: 7,
  },
];

import SkillItem from "./SkillItem";
export default function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <SkillItem
          color={skill.color}
          skill={skill.skill}
          level={skill.level}
          key={skill.id}
        />
      ))}
    </div>
  );
}
