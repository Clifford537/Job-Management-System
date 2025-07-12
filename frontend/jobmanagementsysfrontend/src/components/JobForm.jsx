import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaAlignLeft,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";
import API from "../api";

const JobForm = () => {
  const { id } = useParams();        
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
  });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await API.get(`/jobs/${id}/`);
        setFormData({
          title: data.title,
          description: data.description,
          company_name: data.company_name,
          location: data.location,
          salary: data.salary,
        });
      } catch {
        toast.error("Failed to load job");
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await API.put(`/jobs/${id}/`, formData);
        toast.success("Job updated");
      } else {
        await API.post("/jobs/", { ...formData, status: "active" });
        toast.success("Job posted");
      }
      navigate("/");
    } catch {
      toast.error("Save failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-3xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center">
        {isEdit ? "Edit Job" : "Post a New Job"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
   
        <div>
          <label className="flex items-center font-semibold text-sm mb-1">
            <FaBriefcase className="mr-2 text-indigo-500" />
            Job Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="flex items-center font-semibold text-sm mb-1">
            <FaBuilding className="mr-2 text-indigo-500" />
            Company Name
          </label>
          <input
            type="text"
            name="company_name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="flex items-center font-semibold text-sm mb-1">
            <FaMapMarkerAlt className="mr-2 text-indigo-500" />
            Location
          </label>
          <input
            type="text"
            name="location"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="flex items-center font-semibold text-sm mb-1">
            <FaMoneyBillWave className="mr-2 text-indigo-500" />
            Salary
          </label>
          <input
            type="number"
            name="salary"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center font-semibold text-sm mb-1">
            <FaAlignLeft className="mr-2 text-indigo-500" />
            Job Description
          </label>
          <textarea
            name="description"
            rows="5"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            <FaPaperPlane />
            {isEdit ? "Update Job" : "Submit Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
