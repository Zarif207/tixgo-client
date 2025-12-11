import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AddTicket = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const imageKey = import.meta.env.VITE_IMGBB_API_KEY;

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // UPLOAD IMAGE
      const imgFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imgFile);

      const uploadUrl = `https://api.imgbb.com/1/upload?key=${imageKey}`;
      const imgRes = await axios.post(uploadUrl, formData);

      if (!imgRes.data.success) {
        alert("Image upload failed!");
        setLoading(false);
        return;
      }

      const imageURL = imgRes.data.data.url;

      // TICKET OBJECT
      const ticketInfo = {
        title: data.title,
        from: data.from,
        to: data.to,
        transport: data.transport,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        departure: data.departure,
        perks: data.perks || [],
        image: imageURL,
        vendorName: user?.displayName || "Unknown Vendor",
        vendorEmail: user?.email || "No Email",
        status: "pending",
        createdAt: new Date(),
      };

      // SEND TO BACKEND
      const res = await axiosSecure.post("/tickets", ticketInfo);

      // SUCCESS CHECK (Fixed)
      if (res.data?.insertedId) {
        alert("Ticket Added Successfully!");
        reset();
      } else {
        alert("Failed to add ticket.");
      }

    } catch (error) {
      console.error("Error adding ticket:", error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-xl">
      <h2 className="text-3xl font-bold mb-6">Add New Ticket</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Title */}
        <div>
          <label className="font-medium">Ticket Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Dhaka to Chittagong AC Bus"
          />
        </div>

        {/* From - To */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>From</label>
            <input
              type="text"
              {...register("from", { required: true })}
              className="input input-bordered w-full"
              placeholder="Dhaka"
            />
          </div>
          <div>
            <label>To</label>
            <input
              type="text"
              {...register("to", { required: true })}
              className="input input-bordered w-full"
              placeholder="Chittagong"
            />
          </div>
        </div>

        {/* Transport Type */}
        <div>
          <label>Transport Type</label>
          <select
            {...register("transport", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Plane">Plane</option>
            <option value="Launch">Launch</option>
          </select>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Price (per ticket)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label>Ticket Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Departure */}
        <div>
          <label>Departure Date & Time</label>
          <input
            type="datetime-local"
            {...register("departure", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Perks */}
        <div>
          <label className="font-medium">Perks</label>
          <div className="flex gap-4 mt-2">
            <label>
              <input type="checkbox" value="AC" {...register("perks")} /> AC
            </label>
            <label>
              <input type="checkbox" value="WiFi" {...register("perks")} /> WiFi
            </label>
            <label>
              <input type="checkbox" value="Breakfast" {...register("perks")} /> Breakfast
            </label>
          </div>
        </div>

        {/* Image */}
        <div>
          <label>Ticket Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Vendor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Vendor Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label>Vendor Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Button */}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Ticket"}
        </button>
      </form>
    </div>
  );
};

export default AddTicket;