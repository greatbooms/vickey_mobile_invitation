export function PartTitle({ text }: { text: string }) {
  const [part, ...title] = text.split("｜");
  return (
    <h2 className="part-title">
      <span className="part-prefix">{part}｜</span>{" "}
      <span className="part-text">{title.join("｜").trim()}</span>
    </h2>
  );
}
