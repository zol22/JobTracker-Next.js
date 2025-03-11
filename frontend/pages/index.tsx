import Image from 'next/image';
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import LoginButton from '@/components/LoginButton';

const Home = () => {

  const { isSignedIn } = useAuth(); // Get user auth status, this is a boolean
  const router = useRouter();

  // 🔄 Redirect to Dashboard if Signed In
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  console.log(`Thi is isSignIn from Clerk ${isSignedIn}`)

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Job Tracker</h1>
        <p className="text-gray-600 text-lg mb-6">
          Manage your job applications efficiently with Job Tracker.
        </p>
        <LoginButton />
        <Image src="/images/laptop.jpg" alt="Job tracking" width={400} height={300} className="rounded-lg mt-6" />
      </div>
    );

  
};

export default Home;
