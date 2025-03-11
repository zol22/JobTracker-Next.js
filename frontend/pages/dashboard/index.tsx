/* /pages/dashboard */
import Navbar from "@/components/NavBar";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import DashboardContent from "@/components/DashboardContent";
import { useUser } from "@clerk/nextjs";
import { useJobStore } from "@/store/useJobStore";
import { getJobs } from "@/lib/api";


export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("AllJobs"); // Default page
  const { user, isSignedIn } = useUser();
  const { setJobs } = useJobStore();
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch jobs when user signs in
  useEffect(() => {
    if (!isSignedIn) return;

    async function fetchJobs() {
      try {
        setLoading(true);
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  },[isSignedIn, setJobs])


  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Navbar setSelectedTab={setSelectedTab}/>

      {/* Main Dashboard Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/5  rounded-lg">
         <SideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-4/5 p-4 rounded-lg">
          {loading ? (
            <p className="text-center text-gray-600"> Loading jobs... </p>
          ): <DashboardContent selectedTab={selectedTab}/>
 }
        </div>
      </div>
    </div>
  );
}
