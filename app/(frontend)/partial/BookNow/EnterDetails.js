import Label from "@/components/form/Label";
import TextArea from "@/components/form/TextArea";
import React, { useState } from "react";
import Button from "@/components/form/Button";
import TextField from "@/components/form/TextField";
import useApi from "@/hook/useApi";
import ErrorMsg from "@/components/ErrorMsg";
import { MinusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function EnterDetails({
  setIsDetails,
  data,
  setData,
  closeAnim,
}) {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { post } = useApi();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    let guest_email = data.guest_email;
    if (guest_email.length > 0) {
      guest_email = guest_email.filter((email) => email !== "");
    }

    let newData = { ...data, guest_email };

    await post(
      "/api/bookings/store",
      { body: newData },
      {
        onSuccess: (res) => {
          closeAnim();
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
          if (error?.response?.data?.errors) {
            setErrors(error.response.data.errors);
          }
        },
      }
    );
  }
  return (
    <form className="py-6">
      <h2 className="font-30 text-dark2 capitalize mb-4">Enter Details</h2>
      <div className="grid grid-cols-1 gap-y-4 2xl:gap-y-6">
        <div>
          <Label className="required">Name</Label>
          <TextField
            className="border"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <ErrorMsg message={errors?.name} />
        </div>
        <div>
          <Label className="required">Email</Label>
          <TextField
            className="border"
            value={data.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
          />
          <ErrorMsg message={errors?.email} />
        </div>
        <div>
          <Label>Guest Email (s)</Label>

          <div className="space-y-2">
            {data?.guest_email.map((item, index) => (
              <div key={index}>
                <div
                  className={`relative ${
                    data?.guest_email.length > 1 ? "pr-6" : ""
                  }`}
                >
                  {data?.guest_email.length > 1 && (
                    <MinusCircleIcon
                      onClick={() => {
                        let list = { ...data };
                        list.guest_email.splice(index, 1);
                        setData(list);
                      }}
                      className="cursor-pointer hover:text-danger size-5 absolute top-1/2 -translate-y-1/2 right-0"
                    />
                  )}
                  <TextField
                    className="border"
                    value={item || ""}
                    onChange={(e) => {
                      let list = { ...data };
                      list.guest_email[index] = e.target.value;
                      setData(list);
                    }}
                    type="email"
                  />
                </div>
                {errors[`guest_email.${index}`] &&
                  errors[`guest_email.${index}`][0] && (
                    <ErrorMsg message={errors[`guest_email.${index}`][0]} />
                  )}
              </div>
            ))}
          </div>

          <p className="font-16 text-para mt-2">
            Notify up to 10 Additional Guests of the Scheduled event.
          </p>
          <div>
            <Button
              onClick={() =>
                setData({ ...data, guest_email: [...data.guest_email, ""] })
              }
              type="button"
              className="mt-2 text-white gap-2"
            >
              <PlusIcon className="size-5 shrink-0" />
              <span>Add Guest</span>
            </Button>
          </div>
        </div>
        <div>
          <Label>
            Please share anything that will help prepare for our meeting.
          </Label>

          <TextArea
            className="border"
            value={data.message || ""}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />

          <ErrorMsg message={errors.message} />

          <p className="font-16 text-para mt-2">
            By proceeding, you confirm that you have read and agree to
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <Button
          // type="button"
          variant="stroke"
          onClick={() => setIsDetails(false)}
        >
          Back
        </Button>
        <Button
          disabled={loading}
          // type="button"
          onClick={handleSubmit}
        >
          {loading ? "Processing" : "Schedule Event"}
        </Button>
      </div>
    </form>
  );
}
