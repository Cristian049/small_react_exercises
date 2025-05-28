export default function SkillItem({ skill, color, level }) {
  return (
    <div style={{ backgroundColor: color }} className="skill">
      <span> {skill}</span>
      <span>{level === "begginer" && "👶"}</span>
      <span>{level === "intermediate" && "💪"}</span>
      <span>{level === "advanced" && "💪🏻💥"}</span>
    </div>
  );
}
