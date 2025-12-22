import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import {
  themedSwal,
  successAlert,
  errorAlert,
  loadingAlert,
} from "../../../Utils/swal";

const AddTicket = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { register, handleSubmit, reset } = useForm();
  const imageKey = import.meta.env.VITE_IMGBB_API_KEY;
  const onSubmit = async (data) => {
    loadingAlert("Adding ticket...");

    try {
      const imgFile = data.image?.[0];
      if (!imgFile || !imgFile.type.startsWith("image/")) {
        themedSwal.close();
        return errorAlert("Invalid Image", "Please upload a valid image file");
      }
      const formData = new FormData();
      formData.append("image", imgFile);

      const uploadUrl = `https://api.imgbb.com/1/upload?key=${imageKey}`;
      const imgRes = await axios.post(uploadUrl, formData);

      if (!imgRes.data.success) {
        themedSwal.close();
        return errorAlert("Upload Failed", "Image upload failed");
      }

      const imageURL = imgRes.data.data.display_url;
      const ticketInfo = {
        title: data.title,
        from: data.from,
        to: data.to,
        transport: data.transport,
        price: Number(data.price),
        quantity: Number(data.quantity),
        departure: data.departure,
        perks: data.perks ? [].concat(data.perks) : [],
        image: imageURL,
        vendorName: user?.displayName || "Unknown Vendor",
        vendorEmail: user?.email,
        verificationStatus: "pending",
        advertised: false,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/tickets", ticketInfo);

      themedSwal.close();

      if (res.data?.insertedId || res.data?.success) {
        successAlert("Success", "Ticket added successfully!");
        reset();
      } else {
        errorAlert("Failed", "Ticket could not be added");
      }
    } catch (error) {
      themedSwal.close();
      console.error("Add ticket error:", error);
      errorAlert(
        "Error",
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            Add New Ticket
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <input
              {...register("title", { required: true })}
              className="input input-bordered w-full"
              placeholder="Ticket title"
            />

            {/* From */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("from", { required: true })}
                className="input input-bordered"
                placeholder="From"
              />
              <input
                {...register("to", { required: true })}
                className="input input-bordered"
                placeholder="To"
              />
            </div>

            {/* Transport */}
            <select
              {...register("transport", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Transport</option>
              <option>Bus</option>
              <option>Train</option>
              <option>Plane</option>
              <option>Launch</option>
            </select>

            {/* Price */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                {...register("price", { required: true })}
                className="input input-bordered"
                placeholder="Price"
              />
              <input
                type="number"
                {...register("quantity", { required: true })}
                className="input input-bordered"
                placeholder="Quantity"
              />
            </div>

            {/* Departure */}
            <input
              type="datetime-local"
              {...register("departure", { required: true })}
              className="input input-bordered w-full"
            />

            {/* Perks */}
            <div className="flex flex-wrap gap-4">
              {[
                "AC",
                "WiFi",
                "Breakfast",
                "Charging",
                "Snacks",
                "Comfortable Seats",
              ].map((perk) => (
                <label key={perk} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={perk}
                    {...register("perks")}
                    className="checkbox checkbox-primary"
                  />
                  <span>{perk}</span>
                </label>
              ))}
            </div>

            {/* Image */}
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full"
            />

            {/* Vendor Info */}
            <div className="grid grid-cols-2 gap-4">
              <input
                readOnly
                value={user?.displayName || ""}
                className="input input-bordered opacity-70"
              />
              <input
                readOnly
                value={user?.email || ""}
                className="input input-bordered opacity-70"
              />
            </div>

            {/* Submit */}
            <button className="btn btn-primary w-full text-lg">
              Add Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
