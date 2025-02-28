import { SignOutButton, useUser } from "@clerk/nextjs";
import { useJobStore } from "@/store/useJobStore";
import AddJobForm from "@/components/AddJobForm";
import JobList from "@/components/JobList";
import Affirmation from "@/components/Affirmation";
import Reminders from "@/components/Reminders";
import Image from "next/image";
import { useEffect } from "react";
import { getJobs } from "@/lib/api";

export default function Dashboard() {
  const { user } = useUser(); // Get logged-in user info
  const { optimisticJobs, setJobs, handleAddJob, handleDeleteJob, handleUpdateStatus, handleAddComment } = useJobStore();

  // Fetch jobs when component mounts
  useEffect(() => {
    async function fetchJobs() {
      const jobsData = await getJobs();
      setJobs(jobsData);
    }
    fetchJobs();
  }, [setJobs]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* ✅ Navbar with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.firstName} 👋</h1>
        
        {/* Logout Button */}
        <SignOutButton >
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </SignOutButton>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 p-4 rounded-lg">
          <Affirmation />
          <Reminders />
          <Image
            src="/images/laptop.jpg"
            alt="Laptop image"
            width={500}
            height={500}
            priority
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-2/3 p-4 bg-white rounded-lg">
          <AddJobForm onAdd={handleAddJob} />
          <JobList
            jobs={optimisticJobs}
            onUpdateStatus={handleUpdateStatus}
            onAddComment={handleAddComment}
            onDelete={handleDeleteJob}
          />
        </div>
      </div>
    </div>
  );
}
