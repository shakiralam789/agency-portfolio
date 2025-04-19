import AboutSection from "./partial/AboutSection";
import Banner from "./partial/Banner";
import FooterSection from "./partial/FooterSection";
import ServicesSection from "./partial/ServiceSection";
import StoriesStatsSection from "./partial/StoriesSection";

export default function Home() {
  return (
    <>
      <Banner />
      <AboutSection />
      <ServicesSection />
      <StoriesStatsSection />
      <FooterSection />
    </>
  );
}
