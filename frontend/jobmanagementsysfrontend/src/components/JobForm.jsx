// src/components/JobForm.jsx
import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaAlignLeft,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaperPlane,
} from "react-icons/fa";

const JobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs/", { ...formData, status: "active" });
      toast.success("Job posted successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to post job.");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center">
        Post a New Job
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="flex items-center font-semibold text-sm text-gray-700 mb-1">
            <FaBriefcase className="mr-2 text-indigo-500" />
            Job Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="flex items-center font-semibold text-sm text-gray-700 mb-1">
            <FaBuilding className="mr-2 text-indigo-500" />
            Company Name
          </label>
          <input
            type="text"
            name="company_name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center font-semibold text-sm text-gray-700 mb-1">
            <FaMapMarkerAlt className="mr-2 text-indigo-500" />
            Location
          </label>
          <input
            type="text"
            name="location"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Salary */}
        <div>
          <label className="flex items-center font-semibold text-sm text-gray-700 mb-1">
            <FaMoneyBillWave className="mr-2 text-indigo-500" />
            Salary
          </label>
          <input
            type="number"
            name="salary"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description - full width */}
        <div className="md:col-span-2">
          <label className="flex items-center font-semibold text-sm text-gray-700 mb-1">
            <FaAlignLeft className="mr-2 text-indigo-500" />
            Job Description
          </label>
          <textarea
            name="description"
            rows="5"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button - full width */}
<div className="md:col-span-2 flex justify-center">
  <button
    type="submit"
    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
  >
    <FaPaperPlane />
    Submit Job
  </button>
</div>

      </form>
    </div>
  );
};

export default JobForm;
