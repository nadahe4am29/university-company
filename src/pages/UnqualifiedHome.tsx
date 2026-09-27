import { useRef } from "react";
import UnqualifiedHero from "../sections/homes/UnqualifiedHero";
import HomeJobsList from "../sections/homes/HomeJobsList";

const UnqualifiedHome = () => {
  const jobsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToJobs = () => {
    jobsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden">
      <UnqualifiedHero onExplore={scrollToJobs} />
      <HomeJobsList jobType="unqualified" sectionRef={jobsSectionRef} />
    </div>
  );
};

export default UnqualifiedHome;
