/* /pages/dashboard */
import { useEffect} from "react";
import SideBar from "@/components/SideBar";
import DashboardContent from "@/components/DashboardContent";
import { useJobStore } from "@/store/useJobStore";
import Spinner from "@/components/Spinner";

export default function Dashboard() {
  const { fetchJobs, loading } = useJobStore();

  // 🔥 Fetch jobs when user signs in
  useEffect(() => {
    fetchJobs();
  },[fetchJobs])

    // Show a full-screen spinner while loading
    if (loading) {
      return (
          <Spinner />
      );
    }

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      {/* Main Dashboard Content */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Left Section */}
        <div className="w-full lg:w-1/5  rounded-lg">
         <SideBar />
        </div>

        {/* Right Section changes based of SideBar Selection */}
        <div className="w-full p-4 rounded-lg">
         <DashboardContent />
        </div>
      </div>
    </div>
  );
}
