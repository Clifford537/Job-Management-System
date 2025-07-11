import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    API.get(`/jobs/${id}/`)
      .then((res) => setJob(res.data))
      .catch(() => toast.error("Job not found"));
  }, [id]);

  if (!job) {
    return (
      <div className="text-center p-6 text-gray-500 animate-pulse">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg border border-indigo-100">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-2">
        {job.title}
      </h1>

      <div className="flex items-center text-gray-600 mb-1 text-sm">
        <FaBuilding className="mr-2 text-indigo-500" />
        <span className="font-medium">{job.company_name}</span>
      </div>

      <div className="flex items-center text-gray-600 mb-4 text-sm">
        <FaMapMarkerAlt className="mr-2 text-indigo-500" />
        <span>{job.location}</span>
      </div>

      <div className="text-gray-700 mb-4 text-base leading-relaxed whitespace-pre-line">
        {job.description}
      </div>

      <div className="flex items-center text-gray-800 font-semibold mb-6 text-sm">
        <FaMoneyBillWave className="mr-2 text-green-600" />
        <span>Salary: ${job.salary}</span>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md shadow hover:bg-indigo-200 transition"
      >
        <FaArrowLeft />
        Back to Job List
      </Link>
    </div>
  );
};

export default JobDetail;
