import { useState, useOptimistic, startTransition} from 'react';
import { GetStaticProps } from 'next';
import AddJobForm from '../components/AddJobForm';
import JobList from '../components/JobList';
import Reminders from '../components/Reminders';
import { Job } from '../types';
import Affirmation from '../components/Affirmation';
import Image from 'next/image';
import { getJobs } from '@/lib/api';
import { jobsList } from '@/controllers/jobs.controller';
import { useJobStore } from "@/store/useJobStore";
import { useEffect } from "react";


const Home = () => {

  const { optimisticJobs, setJobs, handleAddJob, handleDeleteJob, handleUpdateStatus, handleAddComment } = useJobStore();

   // 🔥 Fetch jobs on component mount
   useEffect(() => {
    async function fetchJobs() {
      const jobsData = await getJobs();
      console.log("Fetched jobs from API:", jobsData); // ✅ Debug API response
      setJobs(jobsData);
    }
    fetchJobs();
  }, [setJobs]);


  //const [jobs, setJobs] = useState<Job[]>(initialJobs);

  /* 🔥 useOptimistic for Optimistic UI
    jobs: the initial array of Job objects.
    Function (prevJobs, updatedJob) => ...:
    Takes the previous array of jobs, prevJobs,
    Finds the single updated job passed in (named updatedJob),
    Replaces the matching job in prevJobs with updatedJob.
  
  */
 
 {/*   const [optimisticJobs, updateOptimisticJobs] = useOptimistic<Job[], Job>( // State, Action
    jobs, // Initial State: array of jobs
    (prevJobs, updatedJob) => // PrevState, Action
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)) // ✅ Update only the relevant job
  );;




  const handleAddJob = async ( jobData: Partial<Job>) => {
    const newJob = await postJob(jobData);
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleDeleteJob = async (id: number) => {
     await deleteJob(id)
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    //  Optimistically update state before API request
    startTransition(() => {
      const updatedJob = { ...jobs.find((job) => job.id === id), status: newStatus } as Job; // First Find the Selected Job & update the status
      updateOptimisticJobs(updatedJob); // The second parameter to updateOptimisticJobs must be the new job object, not function
    });
  
    try {
      const updatedJob = await updateStatus(id, newStatus)
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === id ? updatedJob : job))
      );
    } catch (error) {
      console.error("Failed to update job status:", error);
    }
    
  };

  const handleAddComment = async (id: number, comment: string) => {
    const updatedJob = await addComment(id, comment)
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? updatedJob : job))
    );
  };
*/}

  return (
    <div className="min-h-screen p-6 bg-gray-100">
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
  
};

export default Home;

//Instead of fetching it over HTTP in getStaticProps, you can import it directly. This avoids any HTTP errors during the build.
{/*export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      initialJobs : jobsList,
    },
  };

};*/}