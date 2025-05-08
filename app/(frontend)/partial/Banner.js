"use client";
import Button from "@/components/form/Button";
import OutlinedHeading from "@/components/OutlinedHeading";

export default function Banner() {
  return (
    <section id="home" className="pt-header-height relative min-h-screen w-full overflow-hidden flex items-center bg-gradient-to-br from-blue-50 via-pink-50 to-green-50">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-green-200/30 to-blue-200/30 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-200/30 to-yellow-200/30 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <div className="inline-block mb-6">
          <span className="font-20 text-green-default font-medium uppercase tracking-wider">
            CRAFTING INTUITIVE
          </span>
        </div>

        <OutlinedHeading className="font-90">User-centered designs</OutlinedHeading>

        <h2 className="font-bold text-primary-dark mb-4 md:mb-6 font-90 leading-tight tracking-tight">
          that drive Results
        </h2>

        <p className="text-gray-700 max-w-2xl mx-auto mb-10 md:mb-12 font-20">
          Nuehva Medium design seamless digital experiences that engage users
          and grow your business
        </p>

        <Button href="#contact">
          Contact us
        </Button>
      </div>
    </section>
  );
}
