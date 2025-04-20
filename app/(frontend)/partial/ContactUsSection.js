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

export default function ContactForm() {

  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
  const bookNowRef = useRef(null);

  const { register, control, post, put, errors, handleSubmit } = useForm({
    name: "",
    email: "",
    company_name: "",
    project_budget: "",
    service_type: "",
    project_details: "",
  });

  function onSubmit(data) {
    console.log(data);
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

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left side - Text and Image */}
          <div className="text-center md:text-left w-full md:w-7/12 2xl:w-1/2 mb-8 md:mb-0">
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
          <div className="w-full md:w-5/12 2xl:w-1/2 mt-6">
            <div className="relative rounded-3xl shadow-sm p-4 2xl:p-6">
              <Image
                className="rounded-3xl absolute top-0 right-0 w-full -z-10 h-full"
                src={"/images/colorFull-rec.png"}
                alt="shape"
                width={500}
                height={500}
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="col-span-2">
                    <Label>Full Name</Label>
                    <TextField
                      {...register("name", {
                        required: "name is required",
                      })}
                      placeholder={"Enter your fullname"}
                    />
                    <ErrorMsg message={errors?.name?.message} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Label>Company Name</Label>
                    <TextField
                      {...register("company_name")}
                      placeholder={"Enter your company name"}
                    />
                    <ErrorMsg message={errors?.company_name?.message} />
                  </div>

                  {/* Email */}
                  <div className="col-span-2 md:col-span-1">
                    <Label>Email</Label>
                    <TextField
                      {...register("name", {
                        required: "Email is required",
                        isEmail: "Please enter a valid email address",
                      })}
                      placeholder={"Enter your email"}
                    />
                    <ErrorMsg message={errors?.email?.message} />
                  </div>

                  {/* Service Type */}
                  <div>
                    <Label>Service Type</Label>
                    <Controller
                      name="service_type"
                      control={control}
                      render={({ field }) => (
                        <>
                          <CustomSelect
                            {...field}
                            options={[
                              { label: "option 1", value: "1" },
                              { label: "Option 2", value: "2" },
                            ]}
                            placeholder="Select status"
                          />
                        </>
                      )}
                    />
                    <ErrorMsg message={errors?.status?.message} />
                  </div>

                  <div>
                    <Label>project budget</Label>
                    <Controller
                      name="project_budget"
                      control={control}
                      render={({ field }) => (
                        <>
                          <CustomSelect
                            {...field}
                            options={[
                              { label: "option 1", value: "1" },
                              { label: "Option 2", value: "2" },
                            ]}
                            placeholder="Select status"
                          />
                        </>
                      )}
                    />
                    <ErrorMsg message={errors?.status?.message} />
                  </div>

                  {/* Project Details */}
                  <div className="col-span-2">
                    <Label>Project Details</Label>
                    <TextArea
                      rows="4"
                      {...register("project_details")}
                      placeholder="Describe more about your idea!"
                    ></TextArea>
                    <ErrorMsg message={errors?.project_details?.message} />
                  </div>

                  {/* Submit Buttons */}
                  <div className="col-span-2 flex flex-wrap items-center gap-4 mt-2">
                    <Button type="submit">Submit form</Button>
                    <span className="text-gray-500">Or,</span>
                    <Button onClick={openBookNow} type="button">Book a direct call</Button>
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
