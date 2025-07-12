import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl text-center text-white space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Find Your <span className="text-red-500">Next</span> Opportunity
        </h1>

        <p className="text-lg md:text-xl text-zinc-300">
          Browse top job listings across industries, updated daily to keep you ahead.
        </p>

        <button
          onClick={() => navigate("/jobs")}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full shadow-md transition"
        >
          Browse Jobs
        </button>
      </div>
    </div>
  );
}
