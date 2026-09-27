import { useTranslation } from "react-i18next";

const logoModules = import.meta.glob("../../assets/logo/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const logos = Object.entries(logoModules).map(([path, src]) => ({
  src,
  name: decodeURIComponent(path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "partner"),
}));

const LogoCard = ({ src, name }: { src: string; name: string }) => (
  <article className="flex h-28 w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-card px-5">
    <img src={src} alt={name} className="max-h-16 w-auto max-w-full object-contain" />
  </article>
);

const HomePartners = () => {
  const { t } = useTranslation();

  if (logos.length === 0) return null;

  return (
    <section className="bg-background px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-foreground md:text-4xl">
          {t("homePage.partners.title")}
        </h2>

        <div className="partners-mask overflow-hidden" dir="ltr">
          <div className="partners-track flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-5 pe-5"
                aria-hidden={copy === 1}
              >
                {logos.map((logo) => (
                  <LogoCard key={`${logo.src}-${copy}`} src={logo.src} name={copy === 0 ? logo.name : ""} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePartners;
