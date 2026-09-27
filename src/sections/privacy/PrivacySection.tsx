type PrivacySectionProps = {
  index: number;
  title: string;
  items: string[];
};

const PrivacySection = ({ index, title, items }: PrivacySectionProps) => {
  return (
    <section className="soft-card px-6 py-8 sm:px-10 sm:py-10">
      <h2 className="mb-5 text-xl font-extrabold sm:text-2xl">
        {index}. {title}
      </h2>
      <ul className="space-y-3 text-sm leading-8 text-muted-foreground sm:text-base">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PrivacySection;
