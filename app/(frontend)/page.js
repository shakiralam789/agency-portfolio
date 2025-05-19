import AboutSection from "./partial/AboutSection";
import Banner from "./partial/Banner";
import ContactForm from "./partial/ContactUsSection";
import ServicesSection from "./partial/ServiceSection";
import StoriesStatsSection from "./partial/StoriesSection";
import TestimonialSlider from "./partial/TestimonialSlider";

export default function Home() {
  return (
    <>
      <Banner />
      <AboutSection />
      <ServicesSection />
      <StoriesStatsSection />
      <TestimonialSlider />
      <ContactForm />
    </>
  );
}
