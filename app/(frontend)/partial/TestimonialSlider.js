"use client";
// components/TestimonialSlider.jsx
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
    name: "Brian Jackson",
    position: "CMO Of Kinsta",
    text: "For a free contact form, this works great. They even include form submission data in the admin, which...",
    title: "Excellent Design",
    image: "/images/image-2.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    position: "CMO Of Kinsta",
    text: "For a free contact form, this works great. They even include form submission data in the admin, which...",
    title: "Excellent Design",
    image: "/images/image-2.jpg",
  },
  {
    id: 3,
    name: "kayla Garcia",
    position: "CMO Of Kinsta",
    text: "For a free contact form, this works great. They even include form submission data in the admin, which...",
    title: "Excellent Design",
    image: "/images/image-2.jpg",
  },
  {
    id: 4,
    name: "linda Smith",
    position: "CMO Of Kinsta",
    text: "For a free contact form, this works great. They even include form submission data in the admin, which...",
    title: "Excellent Design",
    image: "/images/image-2.jpg",
  },
  // Add more testimonials as needed
];

export default function TestimonialSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      id="testimonials"
      className="py-16 overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: 'url("/images/colorFull-bg.jpg")',
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <Image
          className="absolute top-0 left-0 right-0 w-full"
          src="/images/map.png"
          width={800}
          height={800}
          alt="bg"
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
          <div className="flex items-center space-x-3 z-20">
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
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-black/5 backdrop-blur-md rounded-3xl shadow-md overflow-hidden h-full">
                  <div className="mb-3 flex justify-between">
                    <Quote className="ml-6 w-[100px] h-[100px]" />
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
                  <div className="p-6 pt-0">
                    <h3 className="font-20 font-bold text-gray-800 mb-3">
                      {testimonial.title}
                    </h3>
                    <P className="mb-6">{testimonial.text}</P>
                    <div>
                      <h4 className="font-24 font-bold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <P>{testimonial.position}</P>
                    </div>
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
