"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Subtitle from "./Subtitle";
import Title from "./Title";
import { IconButton } from "@/components/form/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import P from "./P";
import Quote from "@/components/icons/Quote";

const testimonials = [
  {
    id: 1,
    name: "Lena M.",
    position: "Co-founder, FractFi",
    text: "Nuehva didn't just design a beautiful interface—they helped us shape the entire product experience. Their user research uncovered insights we hadn't considered, and the final UI...",
    title: "Startup Founder – Fintech App",
    image: "/images/testimonial/testimonial-image-1.jpg",
  },
  {
    id: 2,
    name: "James R.",
    position: "Product Lead, Operatis",
    text: "Our enterprise tool had great functionality but suffered from a clunky UX. Nuehva transformed the platform's usability, streamlined the workflows, and brought a level of polish our...",
    title: "Product Manager – SaaS Platform",
    image: "/images/testimonial/testimonial-image-2.jpg",
  },
  {
    id: 3,
    name: "Angela T",
    position: "CMO, Loom & Oak",
    text: "For a free contact form, this works great. They even include form submission data in the admin, which...",
    title: "MD – E-commerce Brand",
    image: "/images/testimonial/testimonial-image-3.jpg",
  },
  {
    id: 4,
    name: "Robert D.",
    position: "Co-founder, LearnFlow",
    text: "What sets Nuehva apart is their genuine partnership approach. They didn't just build our app — they helped shape our product strategy.",
    title: "MD – E-commerce Brand",
    image: "/images/testimonial/testimonial-image-4.jpg",
  },
];

export default function TestimonialSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section id="testimonials" className="overflow-hidden">
      <div className="container mx-auto px-4 !py-16 2xl:!py-20 z-10 relative">
        <Image
          src={"/images/map.png"}
          alt="Service Background"
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full"
        />

        <div className="mb-12 relative flex flex-wrap justify-between items-end">
          <div>
            <Subtitle className="mb-2">TESTIMONIALS</Subtitle>
            <Title>
              Worldwide Customers
              <br />
              Speaks about our Service
            </Title>
          </div>
          <div className="flex items-center space-x-3 z-20 mt-4">
            <IconButton
              ref={prevRef}
              icon={<ChevronLeft />}
              aria-label="Previous slide"
            />
            <IconButton
              ref={nextRef}
              icon={<ChevronRight />}
              aria-label="Next slide"
            />
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="!pb-4 swiper-container-equal-height"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <div className="flex flex-col rounded-3xl shadow-md overflow-hidden h-full bg-white relative">
                  <div className="flex-grow">
                    <div className="mb-3 flex justify-between">
                      <Quote className="mt-6 relative z-20 ml-6 w-[100px] h-[100px]" />
                      <div className="w-1/2 aspect-square bg-blue-100 rounded-bl-3xl overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.title}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-6 pt-3">
                      <h3 className="font-20 font-semibold text-gray-700 mb-3">
                        {testimonial.title}
                      </h3>
                      <P className="mb-0">"{testimonial.text}"</P>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <h4 className="font-24 font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <P className="mb-0">{testimonial.position}</P>
                  </div>

                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                      className="w-full h-full object-cover"
                      src={"/images/testimonial/testimonial-card-bg.png"}
                      alt="Map"
                      width={1920}
                      height={1080}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
