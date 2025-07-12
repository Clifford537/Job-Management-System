// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import JobForm from "./components/JobForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/create" element={<JobForm />} />
        <Route path="/jobs/:id/edit" element={<JobForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
