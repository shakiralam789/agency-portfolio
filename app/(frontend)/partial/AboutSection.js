
import Button from "@/components/form/Button";

export default function AboutSection() {

  return (
    <section
      className="py-16 md:py-24 bg-[#fcfaf8] overflow-hidden"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-5/12 xl:w-5/12">
            <span
              className="text-green-default font-medium uppercase tracking-wider"
            >
              ABOUT US
            </span>

            <h2
              className=" font-bold font-48 text-primary-dark mt-3 mb-6"
            >
              We're a team of <br className="hidden sm:block" />
              passionate designers
            </h2>

            <p
              className="def-para mb-8"
            >
              Nuehva Medium is a team of passionate designers and Developers
              that dedicated to creating user-friendly, visually stunning
              digital experiences. With years of expertise in UI/UX design &
              Development, we help brands connect with their audience and
              achieve their goals.
            </p>
            <Button href="/contact">Contact us</Button>
          </div>

          {/* Illustration */}
          <div className="w-full lg:w-6/12 xl:w-6/12"></div>
        </div>
      </div>
    </section>
  );
}
