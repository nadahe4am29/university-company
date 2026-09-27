import { useEffect, useState } from "react";
import type { Job } from "./ApprovedJobs";
import background from "../assets/images/background.jpg";

const Home = () => {
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleSearch = async () => {
    console.log("Searching for:", selectedTitle);
    // Later you can filter locally or call API 👍
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data: Job[] = await res.json();

        const titles = [...new Set(data.map((job) => job.title))];
        setJobTitles(titles);
      } catch (e) {
        console.error(e);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="relative w-full h-162.5 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl font-semibold mb-4 text-center drop-shadow-lg">
          The Easiest Way to Get Your New Job
        </h1>

        <p className="text-lg mb-10 text-center drop-shadow">
          Find jobs, create trackable resumes and enrich your applications.
        </p>

        <div className="flex flex-col md:flex-row gap-3 p-5 border border-gray-400 rounded-xl shadow-2xl w-full max-w-4xl bg-white/90">
          <select
            className="flex-1 p-3 rounded border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none text-black"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          >
            <option value="">Search by job title…</option>

            {jobTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Search Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
