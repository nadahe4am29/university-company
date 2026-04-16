import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import {
  HiBriefcase,
  HiDocument,
  HiCheckCircle,
  HiLightningBolt,
  HiLightBulb,
} from "react-icons/hi";

const SECTION_CARDS = [
  {
    titleKey: "servicesPage.section1.title" as const,
    itemsKey: "servicesPage.section1.items" as const,
    icon: HiBriefcase,
    accent: "border-l-primary text-primary",
  },
  {
    titleKey: "servicesPage.section2.title" as const,
    itemsKey: "servicesPage.section2.items" as const,
    icon: HiDocument,
    accent: "border-l-secondary text-secondary",
  },
  {
    titleKey: "servicesPage.whyChoose.title" as const,
    itemsKey: "servicesPage.whyChoose.items" as const,
    icon: HiLightningBolt,
    accent: "border-l-primary text-primary",
  },
  {
    titleKey: "servicesPage.whyDifferent.title" as const,
    itemsKey: "servicesPage.whyDifferent.items" as const,
    icon: HiLightBulb,
    accent: "border-l-secondary text-secondary",
  },
];

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-mesh min-h-screen px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl pt-4 md:pt-8">
        <div className="mb-12 text-center md:mb-16">
          <h1 className="bg-linear-to-r from-primary via-foreground to-secondary bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-5xl">
            {t("servicesPage.title")}
          </h1>
        </div>

        <div className="mb-8 md:mb-10">
          <div
            className="card-surface p-6 text-right text-base leading-relaxed text-muted-foreground shadow-sm sm:p-8 sm:text-lg"
            dir="rtl"
          >
            <p>{t("servicesPage.intro")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {SECTION_CARDS.slice(0, 2).map((s) => (
            <ServiceCard
              key={s.titleKey}
              title={t(s.titleKey)}
              items={t(s.itemsKey, { returnObjects: true }) as string[]}
              icon={s.icon}
              accent={s.accent}
            />
          ))}
        </div>

        <div className="mt-6 md:mt-8">
          <ServiceCard
            title={t("servicesPage.section3.title")}
            items={t("servicesPage.section3.items", {
              returnObjects: true,
            }) as string[]}
            icon={HiCheckCircle}
            accent="border-l-accent text-accent"
            fullWidth
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 lg:grid-cols-2">
          {SECTION_CARDS.slice(2).map((s) => (
            <ServiceCard
              key={s.titleKey}
              title={t(s.titleKey)}
              items={t(s.itemsKey, { returnObjects: true }) as string[]}
              icon={s.icon}
              accent={s.accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function ServiceCard({
  title,
  items,
  icon: Icon,
  accent,
  fullWidth,
}: {
  title: string;
  items: string[];
  icon: ComponentType<{ className?: string }>;
  accent: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`card-surface border-l-4 p-6 text-right shadow-sm sm:p-8 ${accent} ${
        fullWidth ? "lg:col-span-2" : ""
      }`}
      dir="rtl"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted ring-1 ring-border">
          <Icon className="h-6 w-6 text-foreground" />
        </div>
        <h3 className="text-xl font-bold text-card-foreground sm:text-2xl">
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {items.map((item: string, index: number) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesPage;
