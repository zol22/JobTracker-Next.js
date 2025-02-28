import { create } from 'zustand'
import { Job } from '@/types'
import { addComment, deleteJob, postJob, updateStatus } from "@/lib/api";
import { jobsList } from "@/controllers/jobs.controller";

type JobState = {
    jobs: Job[];
    setJobs: (jobs: Job[]) => void
    optimisticJobs: Job[];
    handleAddJob: (jobData: Partial<Job>) => Promise<void>;
    handleDeleteJob: (id: number) => Promise<void>;
    handleUpdateStatus: (id: number, newStatus: string) => Promise<void>;
    handleAddComment: (id: number, comment: string) => Promise<void>;
  };

console.log("🚀 Initial jobsList in Zustand:", jobsList); // ✅ Check what Zustand gets

  export const useJobStore = create<JobState>((set) => ({
    jobs: [],
    setJobs: (jobs) => { 
        set({ jobs, optimisticJobs: jobs}) 
        console.log(jobs)
    },
    optimisticJobs: [],
  
    handleAddJob: async (jobData) => {
      const newJob = await postJob(jobData);
      set((state) => ({ jobs: [...state.jobs, newJob], optimisticJobs: [...state.jobs, newJob] }));
    },
  
    handleDeleteJob: async (id) => {
      await deleteJob(id);
      set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== id),
        optimisticJobs: state.optimisticJobs.filter((job) => job.id !== id),
      }));
    },
  
    handleUpdateStatus: async (id, newStatus) => {
      // 🔥 Optimistic UI update
      set((state) => ({
        optimisticJobs: state.optimisticJobs.map((job) =>
          job.id === id ? { ...job, status: newStatus } : job
        ),
      }));
  
      try {
        const updatedJob = await updateStatus(id, newStatus);
        set((state) => ({
          jobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
          optimisticJobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
        }));
      } catch (error) {
        console.error("Failed to update job status:", error);
      }
    },
  
    handleAddComment: async (id, comment) => {
      const updatedJob = await addComment(id, comment);
      set((state) => ({
        jobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
        optimisticJobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
      }));
    },
  }));