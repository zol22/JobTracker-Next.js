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
const DashboardContent = () => {
    const { selectedTab } = useJobStore();
   
      switch (selectedTab) {
      case 'AllJobs': return <JobList />;
      case 'AddJob': return <AddJobForm  />;
      case 'Stats': return <Stats />;
      case 'Affirmation': return <Affirmation />;
      case 'Reminders': return <Reminders />;
      default: return <JobList />; // Fallback to JobList if no match
      }
};

export default DashboardContent;
