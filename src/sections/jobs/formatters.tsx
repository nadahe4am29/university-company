export function SalaryText({ value }: { value: string }) {
  const match = value.match(/^(.*?)(\s*ريال| SAR)?$/);
  if (!match) return <span dir="ltr">{value}</span>;
  return (
    <span className="inline-flex items-center gap-1">
      <span dir="ltr">{match[1].trim()}</span>
      {match[2] ? <span>{match[2].trim()}</span> : null}
    </span>
  );
}

export function ExperienceText({ value }: { value: string }) {
  const match = value.match(/^(\+\d+)\s+(.+)$/);
  if (!match) return <>{value}</>;
  return (
    <>
      <span dir="ltr">{match[1]}</span> {match[2]}
    </>
  );
}

export function jobCode(id: string, code?: string) {
  if (code) return code;
  if (/^UG-\d+-\d+$/i.test(id)) return id;
  return id;
}
