// components/ServicesSection.jsx
import Button from "@/components/form/Button";
import Image from "next/image";

const ServiceCard = ({ title, imageSrc, alt }) => {
  return (
    <div className="bg-black bg-opacity-5 rounded-xl p-8 flex flex-col justify-between items-center hover:shadow-lg">
      <div className="mb-6 h-36">
        <Image
          src={imageSrc}
          alt={alt}
          width={180}
          height={180}
          className="w-11/12 mx-auto"
        />
      </div>
      <h3 className="text-primary-dark font-18 font-semibold text-center">{title}</h3>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "UI/UX Design",
      imageSrc: "/images/ui-ux.png",
      alt: "UI/UX Design illustration",
    },
    {
      id: 2,
      title: "Web Design & Development",
      imageSrc: "/images/web-design.png",
      alt: "Web Design illustration",
    },
    {
      id: 3,
      title: "App Development",
      imageSrc: "/images/app-development.png",
      alt: "App Development illustration",
    },
    {
      id: 4,
      title: "Cloud & SaaS Design + Development",
      imageSrc: "/images/cloud-sass.png",
      alt: "Cloud and SaaS illustration",
    },
  ];

  return (
    <section
      className="relative py-16 overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ background: "url('/images/service-bg.jpg')" }}
    >
        <div>
            
        </div>
      {/* Background gradient effect */}

      <div className="container">
        <div className="flex flex-col md:flex-row items-end md:justify-between mb-12">
          <div className="lg:w-1/2">
            <p className="text-green-default font-20 font-medium mb-2">OUR SERVICES</p>
            <h2 className="font-48 text-primary-dark font-bold">
              Our Featured Digital Services
            </h2>
          </div>

          <div className="mt-6 md:mt-0">
            <Button href="/contact">Contact us</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              imageSrc={service.imageSrc}
              alt={service.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
