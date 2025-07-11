// src/components/JobList.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaBuilding, FaEye } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      toast.error("Failed to load jobs.");
    }
  };

  const handleFilter = () => {
    const filtered = jobs.filter((job) => {
      return (
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        job.company_name.toLowerCase().includes(company.toLowerCase())
      );
    });
    setFilteredJobs(filtered);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-800">Available Jobs</h1>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
        >
          <MdAddCircle className="text-lg" />
          Post New Job
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Location"
          className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-indigo-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Company"
          className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-indigo-500"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition"
        >
          Apply Filters
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-indigo-100 shadow-md hover:shadow-lg rounded-xl p-5 transition"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-1">{job.title}</h2>

              <p className="text-sm text-gray-600 font-medium mb-1 flex items-center gap-1">
                <FaBuilding className="text-indigo-400" /> {job.company_name}
              </p>

              <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                <FaMapMarkerAlt className="text-indigo-400" /> {job.location}
              </p>

              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {job.description}
              </p>

              <p className="text-sm font-semibold text-gray-800">
                Salary: <span className="text-green-600">${job.salary}</span>
              </p>

              <Link
                to={`/jobs/${job.id}`}
                className="inline-flex items-center gap-1 mt-4 text-sm text-indigo-600 font-medium hover:underline"
              >
                <FaEye className="text-indigo-500" />
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
