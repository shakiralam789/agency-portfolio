"use client";
import ClockIcon from "@/components/icons/Clock";
import VideoIcon from "@/components/icons/Video";
import Image from "next/image";
import React, { forwardRef, useState, useEffect, useRef } from "react";
import SelectDataTime from "./SelectDataTime";
import EnterDetails from "./EnterDetails";
import dayjs from "dayjs";
import P from "../P";

const DiscoveryCall = forwardRef(({ closeAnim }, ref) => {
  const [isDetails, setIsDetails] = useState(false);
  const modalRef = useRef(null);
  const [data, setData] = useState({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    date: dayjs(),
    name: "",
    email: "",
    guest_email: [""],
    message: "",
  });

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className="book-now-modal fixed inset-0 z-50 flex justify-end"
    >
      <div
        onClick={closeAnim}
        className="absolute inset-0 bg-black/50 cursor-zoom-out"
      ></div>
      <div className="relative active max-w-[800px] 2xl:max-w-[1000px] w-full opacity-0 pointer-events-none [&.active]:opacity-100 [&.active]:pointer-events-auto bg-white z-30 h-full">
        <div className="lenis-prevent h-full overflow-y-auto grid grid-cols-12 gap-2 2xl:gap-4">
          {/* Left Column */}
          <div className="lenis-prevent col-span-12 md:col-span-5 border-r h-full md:overflow-y-auto scroll-smooth">
            <div className="p-4 2xl:p-5 pr-0 mr-4">
              <div className="p-4 2xl:p-5 relative">
                <Image
                  className="absolute top-0 right-0 w-full -z-10 h-full"
                  src={"/images/colorFull-rec.png"}
                  alt="shape"
                  width={500}
                  height={500}
                />
                <h2 className="font-20 font-semibold text-dark2">
                  Schedule a meeting
                </h2>
                <ul className="mt-5 font-16 space-y-4 text-primary-green">
                  <li className="flex gap-3 font-16">
                    <ClockIcon className="mt-0.5" />
                    <span>30 Minutes</span>
                  </li>
                  <li className="flex gap-3 font-16">
                    <VideoIcon className="mt-0.5" />
                    <span>
                      We will call you on the selected Date &amp; Time .
                    </span>
                  </li>
                </ul>
                <div className="mt-6 space-y-2 font-16 text-para">
                  <P className="text-justify">
                    A 30 minutes walk through of the software followed by
                    Nuehva. Or if you prefer, training on specific features e.g.
                    filtering or portfolio management
                  </P>

                  <P className="text-justify">
                    If you have any&nbsp;queries,&nbsp;please email us at
                    <span className="text-green-default">
                      {" "}
                      nuehva@gmail.com
                    </span>
                    .
                  </P>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lenis-prevent col-span-12 md:col-span-7 h-full md:overflow-y-auto">
            <div className="h-full">
              <div className="p-3 pr-5">
                {isDetails ? (
                  <EnterDetails
                    data={data}
                    setData={setData}
                    isDetails={isDetails}
                    setIsDetails={setIsDetails}
                    closeAnim={closeAnim}
                  />
                ) : (
                  <SelectDataTime
                    closeAnim={closeAnim}
                    data={data}
                    setData={setData}
                    isDetails={isDetails}
                    setIsDetails={setIsDetails}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

DiscoveryCall.displayName = "DiscoveryCall";
export default DiscoveryCall;
