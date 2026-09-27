import HomeHero from "../sections/home/HomeHero";
import HomeStats from "../sections/home/HomeStats";
import HomeServices from "../sections/home/HomeServices";
import HomeValues from "../sections/home/HomeValues";
import HomeWhy from "../sections/home/HomeWhy";

const HomePage = () => {
  return (
    <div className="bg-background text-foreground">
      <HomeHero />
      <HomeStats />
      <HomeServices />
      <HomeValues />
      <HomeWhy />
    </div>
  );
};

export default HomePage;
