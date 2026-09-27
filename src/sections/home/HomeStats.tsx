import { useTranslation } from "react-i18next";
import {
  HiOutlineOfficeBuilding,
  HiOutlineBadgeCheck,
  HiOutlineUserGroup,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import AnimatedCounter from "../../components/AnimatedCounter";

const HomeStats = () => {
  const { t } = useTranslation();

  const stats: {
    end: number;
    prefix: string;
    label: string;
    icon: IconType;
  }[] = [
    {
      end: 50000,
      prefix: "+",
      label: t("homePage.stats.employees"),
      icon: HiOutlineUserGroup,
    },
    {
      end: 19,
      prefix: "+",
      label: t("homePage.stats.years"),
      icon: HiOutlineBadgeCheck,
    },
    {
      end: 100,
      prefix: "+",
      label: t("homePage.stats.clients"),
      icon: HiOutlineOfficeBuilding,
    },
  ];

  return (
    <section
      id="home-stats"
      className="bg-background px-4 py-12 sm:px-6 md:py-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center rounded-2xl border border-border bg-card px-4 py-8 text-center"
          >
            <stat.icon className="mb-3 h-6 w-6 text-secondary" />
            <p
              dir="ltr"
              className="text-[28px] font-extrabold tabular-nums leading-none text-foreground"
            >
              <AnimatedCounter
                end={stat.end}
                duration={2.2}
                locale="en-US"
                prefix={stat.prefix}
              />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeStats;
