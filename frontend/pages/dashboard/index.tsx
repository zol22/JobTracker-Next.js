/* /pages/dashboard */
import { useJobStore } from "@/store/useJobStore";
import AddJobForm from "@/components/AddJobForm";
import JobList from "@/components/JobList";
import Affirmation from "@/components/Affirmation";
import Reminders from "@/components/Reminders";
import Image from "next/image";
import { useEffect } from "react";
import { getJobs } from "@/lib/api";
import Navbar from "@/components/NavBar";
import { useState } from "react";
import SideBar from "@/components/SideBar";
import DashboardContent from "@/components/DashboardContent";


export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("AllJobs"); // Default page
  
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Navbar />

      {/* Main Dashboard Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/4  rounded-lg">
         <SideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-3/4 p-4 bg-white rounded-lg">
          <DashboardContent selectedTab={selectedTab}/>
        </div>
      </div>
    </div>
  );
}
