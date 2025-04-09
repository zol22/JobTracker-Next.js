/* Handles UI */
import JobList from "./JobList"
import AddJobForm from "./AddJobForm";
import Stats from "./Stats";
import Affirmation from "./Affirmation";
import Reminders from "./Reminders";
import { useJobStore } from "@/store/useJobStore";

type DashboardContentProps = {
  selectedTab: string;
};

// Displays the corresponding content based on the selectedTab which was set in SideBack when user clicks it
const DashboardContent = ({ selectedTab }: DashboardContentProps) => {
    const { handleAddJob } = useJobStore();

  return (
    <div className="shadow-lg rounded-lg">
      {selectedTab === "AllJobs" && <JobList />}
      {selectedTab === "AddJob" && <AddJobForm onAdd={handleAddJob} />}
      {selectedTab === "Stats" && <Stats />}
      {selectedTab === "Affirmation" && <Affirmation />}
      {selectedTab === "Reminders" && <Reminders />}
    </div>
  );
};

export default DashboardContent;
