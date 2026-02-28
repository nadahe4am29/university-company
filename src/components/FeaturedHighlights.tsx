const FeaturedHighlights = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:scale-[1.03] transition">
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-white/60">{text}</p>
    </div>
  );
};

export default FeaturedHighlights;
