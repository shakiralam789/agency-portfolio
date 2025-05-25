"use client";
// components/ContactForm.jsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import P from "./P";
import Subtitle from "./Subtitle";
import Title from "./Title";
import Button from "@/components/form/Button";
import Label from "@/components/form/Label";
import TextField from "@/components/form/TextField";
import useForm from "@/hook/_customUseForm";
import ErrorMsg from "@/components/ErrorMsg";
import { Controller } from "react-hook-form";
import CustomSelect from "@/components/form/CustomSelect";
import TextArea from "@/components/form/TextArea";
import DiscoveryCall from "./BookNow/DiscoveryCall";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactForm() {
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
  const bookNowRef = useRef(null);
  const [serviceTypes, setServiceTypes] = useState([]);

  // Add refs for animation
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  const {
    register,
    control,
    get,
    post,
    put,
    errors,
    handleSubmit,
    apiErrors,
    reset,
  } = useForm({
    full_name: "",
    email: "",
    company_name: "",
    project_budget: "",
    service_type: "",
    project_details: "",
  });

  useEffect(() => {
    async function getProductType() {
      let response = await get("/api/contact/service-types");
      if (response.success) {
        setServiceTypes(response.data);
      }
    }
    getProductType();
  }, [get]);

  function onSubmit(data) {
    post(
      "/api/contact/submit",
      { body: data },
      {
        onSuccess: (res) => {
          reset();
        },
      }
    );
  }

  function openBookNow() {
    setIsBookNowOpen(true);
  }

  function closeAnim() {
    document.body.style.overflow = "auto";
    if (bookNowRef.current) {
      gsap.to(bookNowRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
        onComplete: () => {
          setIsBookNowOpen(false);
        },
      });
    }
  }

  function openAnim() {
    document.body.style.overflow = "hidden";
    if (bookNowRef.current) {
      gsap.fromTo(
        bookNowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power4.out" }
      );
    }
  }

  useEffect(() => {
    if (isBookNowOpen) {
      openAnim();
    } else {
      closeAnim();
    }
  }, [isBookNowOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.set(leftContentRef.current, {
      opacity: 0,
      x: -50,
    });

    gsap.set(rightContentRef.current, {
      opacity: 0,
      x: 50,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom bottom",
        toggleActions: "play none none none",
      },
    });

    tl.to(leftContentRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    });

    tl.to(
      rightContentRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.7"
    );

    return () => {
      if (typeof window !== "undefined" && ScrollTrigger.getAll().length) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left side - Text and Image */}
          <div
            ref={leftContentRef}
            className="text-center md:text-left w-full md:w-1/2 mb-8 md:mb-0"
          >
            <Title className="mb-4">
              Have a project idea in mind?
              <br />
              Let's get started
            </Title>
            <P className="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              We'll schedule a call to discuss your idea. After discovery
              sessions, we'll send a proposal, and upon approval, we'll get
              started
            </P>

            <div className="relative w-8/12 mx-auto md:mx-0">
              <Image
                src="/images/contact-image.png"
                alt="Computer with headphones"
                width={500}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div ref={rightContentRef} className="w-full md:w-1/2 mt-6">
            <div className="relative rounded-2xl shadow-sm p-6 2xl:p-8">
              <Image
                className="rounded-3xl absolute top-0 right-0 w-full -z-10 h-full"
                src={"/images/colorFull-rec.png"}
                alt="shape"
                width={500}
                height={500}
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 2xl:gap-y-8 gap-x-4 2xl:gap-x-6">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <Label className="required">Full Name</Label>
                    <TextField
                      {...register("full_name", {
                        required: "name is required",
                      })}
                      placeholder={"Enter your fullname"}
                    />
                    <ErrorMsg message={errors?.full_name?.message} />
                  </div>
                  <div className="sm:col-span-1">
                    <Label>Company Name</Label>
                    <TextField
                      {...register("company_name")}
                      placeholder={"Enter your company name"}
                    />
                    <ErrorMsg message={errors?.company_name?.message} />
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-1">
                    <Label>Email</Label>
                    <TextField
                      {...register("email", {
                        required: "Email is required",
                        isEmail: "Please enter a valid email address",
                      })}
                      placeholder={"Enter your email"}
                    />
                    <ErrorMsg
                      message={errors?.email?.message || apiErrors?.email}
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <Label>Service Type</Label>
                    <Controller
                      name="service_type"
                      control={control}
                      rules={{ required: "Service Type is required" }}
                      render={({ field }) => (
                        <>
                          <CustomSelect
                            {...field}
                            options={serviceTypes}
                            placeholder="Select service type"
                          />
                        </>
                      )}
                    />
                    <ErrorMsg
                      message={
                        errors?.service_type?.message || apiErrors?.service_type
                      }
                    />
                  </div>

                  <div>
                    <Label>project budget</Label>
                    <div className="relative">
                      <TextField
                        {...register("project_budget")}
                        placeholder={"Enter project budget"}
                        className="pr-8 2xl:pr-10"
                      />
                      <span className="font-16 absolute top-1/2 right-3 -translate-y-1/2">$</span>

                    </div>
                    <ErrorMsg
                      message={
                        errors?.project_budget?.message ||
                        apiErrors?.project_budget
                      }
                    />
                  </div>

                  {/* Project Details */}
                  <div className="sm:col-span-2">
                    <Label>Project Details</Label>
                    <TextArea
                      rows="4"
                      {...register("project_details", {
                        required: "Project details is required",
                      })}
                      placeholder="Describe more about your idea!"
                    ></TextArea>
                    <ErrorMsg message={errors?.project_details?.message} />
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
                    <button type="submit">
                      <Button>Submit form</Button>
                    </button>
                    <span className="text-gray-500">Or</span>
                    <Button onClick={openBookNow}>Book a direct call</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isBookNowOpen && (
        <DiscoveryCall
          ref={bookNowRef}
          isBookNowOpen={isBookNowOpen}
          closeAnim={closeAnim}
        ></DiscoveryCall>
      )}
    </section>
  );
}
