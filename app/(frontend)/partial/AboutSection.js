import Button from "@/components/form/Button";
import Title from "./Title";
import Subtitle from "./Subtitle";
import P from "./P";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-[#fcfaf8] overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-5/12 xl:w-5/12">
            <Subtitle>ABOUT US</Subtitle>
            <Title className="mt-3 mb-6">
              We're a team of <br className="hidden sm:block" />
              passionate designers
            </Title>

            <P className="mb-8">
              Nuehva Medium is a team of passionate designers and Developers
              that dedicated to creating user-friendly, visually stunning
              digital experiences. With years of expertise in UI/UX design &
              Development, we help brands connect with their audience and
              achieve their goals.
            </P>
            <Button href="/contact">Contact us</Button>
          </div>

          {/* Illustration */}
          <div className="w-full lg:w-6/12 xl:w-6/12"></div>
        </div>
      </div>
    </section>
  );
}
