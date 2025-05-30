"use client";
import React, { useEffect, useState } from "react";
import {
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "react-select";
import moment from "moment-timezone";
import Button from "@/components/form/Button";

const timezones = moment.tz.names().map((zone) => ({
  value: zone,
  label: zone,
}));

export default function SelectDataTime({
  setIsDetails,
  data,
  setData,
  closeAnim,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const handleTimezoneChange = (option) => {
    setData({ ...data, timezone: option.value });
  };

  const handleDateTimeChange = (value) => {
    setData({ ...data, date: value });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;
  return (
    <>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            value={data.date || ""}
            onChange={(newValue) => handleDateTimeChange(newValue)}
            displayStaticWrapperAs="mobile"
          />
        </LocalizationProvider>
      </div>
      <div>
        <h2 className="font-20 mb-2 uppercase text-gray-700">Time zone</h2>

        <Select
          options={timezones}
          value={{ value: data.timezone || "", label: data.timezone || "" }}
          onChange={handleTimezoneChange}
          isSearchable={true}
          placeholder="Select a Timezone"
          menuPlacement="top"
        />
      </div>
      <div className="flex gap-2 mt-5">
        <Button variant="stroke" onClick={closeAnim}>
          Close
        </Button>
        <Button onClick={() => setIsDetails(true)}>Next</Button>
      </div>
    </>
  );
}
