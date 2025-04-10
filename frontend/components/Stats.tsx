import { useEffect } from "react";
import { useJobStore } from "@/store/useJobStore";
import { useUser } from "@clerk/nextjs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend,
} from "recharts";

// Color palette
const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#3b82f6"];

const Stats = () => {
  const { user } = useUser();
  const { jobStats, fetchJobStats } = useJobStore();

  useEffect(() => {
    if (user?.id) fetchJobStats();
  }, [user]);

  // ======== Pie Chart: Status Distribution ==========
  const statusCounts = jobStats.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  // ======== Bar Chart: Applications per Month ==========
  const monthlyApplications = jobStats.reduce((acc, job) => {
    const month = new Date(job.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.entries(monthlyApplications).map(([month, count]) => ({
    month,
    count,
  }));

  // ======== Offer Rate ==========
  const totalJobs = jobStats.length;
  const offersCount = jobStats.filter(
    (job) => job.status === "Offer Received" || job.status === "Accepted"
  ).length;
  const offerRate = totalJobs > 0 ? (offersCount / totalJobs) * 100 : 0;

  // ======== Rejection Rate per Month ==========
  const rejectionsByMonth = jobStats.reduce((acc, job) => {
    if (job.status === "Rejected") {
      const month = new Date(job.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const rejectionData = Object.entries(rejectionsByMonth).map(([month, count]) => ({
    month,
    rejections: count,
  }));

  return (
    <div className="mb-4 bg-neutral-100 w-full mt-4 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">📊 Job Application Stats</h2>

      {/* Pie Chart */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120} label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Offer Rate Card */}
      <div className="bg-indigo-100 text-indigo-800 p-4 mb-6 rounded-lg shadow-md text-center">
        <p className="text-lg font-semibold">🎯 Offer Rate</p>
        <p className="text-3xl font-bold">{offerRate.toFixed(1)}%</p>
        <p className="text-sm mt-1 text-indigo-600">{offersCount} out of {totalJobs} applications</p>
      </div>

      {/* Bar Chart: Applications per Month */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">📅 Applications Per Month</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rejection Rate Chart */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">❌ Rejections Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={rejectionData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rejections" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
