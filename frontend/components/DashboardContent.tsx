import JobList from "./JobList"
import AddJobForm from "./AddJobForm";
import Stats from "./Stats";
import Affirmation from "./Affirmation";
import Reminders from "./Reminders";
import { useJobStore } from "@/store/useJobStore";

type DashboardContentProps = {
  selectedTab: string;
};

const DashboardContent = ({ selectedTab }: DashboardContentProps) => {
    const { optimisticJobs, handleAddJob, handleDeleteJob, handleUpdateStatus, handleAddComment } = useJobStore();

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {selectedTab === "AllJobs" && <JobList 
            jobs={optimisticJobs}
            onUpdateStatus={handleUpdateStatus}
            onAddComment={handleAddComment}
            onDelete={handleDeleteJob} />}
      {selectedTab === "AddJob" && <AddJobForm onAdd={handleAddJob} />}
      {selectedTab === "Stats" && <Stats />}
      {selectedTab === "Affirmation" && <Affirmation />}
      {selectedTab === "Reminders" && <Reminders />}
    </div>
  );
};

export default DashboardContent;
