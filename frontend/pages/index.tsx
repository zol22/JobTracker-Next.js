import { useState} from 'react';
import { GetStaticProps } from 'next';
import AddJobForm from '../components/AddJobForm';
import JobList from '../components/JobList';
import Reminders from '../components/Reminders';
import { Job } from '../types';
import Affirmation from '../components/Affirmation';
import Image from 'next/image';
import { addComment, deleteJob, getJobs, postJob, updateStatus } from '@/lib/api';


type HomeProps = {
  initialJobs: Job[]
}

const Home = ({ initialJobs }: HomeProps ) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);


  const handleAddJob = async ( jobData: Partial<Job>) => {
    const newJob = await postJob(jobData);
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleDeleteJob = async (id: number) => {
     await deleteJob(id)
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    const updatedJob = await updateStatus(id, status)
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? updatedJob : job))
    );
  };

  const handleAddComment = async (id: number, comment: string) => {
    const updatedJob = await addComment(id, comment)
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? updatedJob : job))
    );
  };

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
            jobs={jobs}
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


// Difference between getStaticProps and getServerSideProps
export const getStaticProps: GetStaticProps = async () => {
  const initialJobs = await getJobs();
  console.log(`These are initial Jobs from GetStaticProps: ${JSON.stringify(initialJobs)}`)

  return {
    props: {
      initialJobs,
    },
  };

};