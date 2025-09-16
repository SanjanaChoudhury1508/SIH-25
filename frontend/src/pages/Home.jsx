import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RoleTabs from "../components/RoleTabs";
import QuickLinks from "../components/QuickLinks";
import InternshipCard from "../components/InternshipCard";
import { fetchInternships } from "../api/internshipApi";

export default function Home(){
  const [role, setRole] = useState("student");
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchInternships();
        // if backend returns object wrap in array as needed
        setInternships(Array.isArray(data) ? data : (data.internships || []));
      } catch (err) {
        console.error("Failed to load internships:", err);
        setInternships([]);
      } finally { setLoading(false); }
    };
    load();
  },[]);

  const handleApply = async (internshipId) => {
    // minimal front-end placeholder - real call: POST /api/applications with { internshipId }
    alert("Applying for internship id: " + internshipId + " (frontend placeholder)");
    // you can call axios here to POST /applications (protected endpoint)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* Hero */}
        <section className="bg-white rounded p-8 shadow mb-6">
          <div className="md:flex md:justify-between md:items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Apply now and get matched with internships designed to enhance your skills.</h2>
              <p className="text-gray-600">The Prime Minister’s Internship Scheme offers students from colleges and universities the opportunity to work on impactful projects and learn from mentors.</p>
              <div className="mt-4 flex gap-3">
                <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</a>
                <a href="/register" className="border px-4 py-2 rounded">Browse Internships</a>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <RoleTabs onSelect={(r)=>setRole(r)} />
            </div>
          </div>
        </section>

        {/* role quick links */}
        <div className="md:flex md:items-start md:gap-6 mb-6">
          <div className="md:w-1/3 space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-lg font-semibold">Role</h4>
              <p className="text-sm text-gray-500 mt-1">Selected: <span className="font-medium">{role}</span></p>
            </div>
            <QuickLinks />
          </div>

          <div className="md:w-2/3">
            <section className="bg-white p-4 rounded shadow mb-4">
              <h3 className="text-xl font-semibold">Internships</h3>
            </section>

            <section className="space-y-4">
              {loading ? (
                <div className="p-6 bg-white rounded shadow">Loading internships...</div>
              ) : internships.length === 0 ? (
                <div className="p-6 bg-white rounded shadow">No internships available.</div>
              ) : internships.map((i)=>(
                <InternshipCard key={i._id || i.internship_id || i.id} internship={i} onApply={handleApply} />
              ))}
            </section>
          </div>
        </div>

      </main>
    </div>
  );
}
