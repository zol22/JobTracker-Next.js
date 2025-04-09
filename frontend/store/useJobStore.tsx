/* Calls function from /lib/api.tsx to Fetch */
import { create } from 'zustand'
import { Job } from '@/types'
import { addComment, getComments, deleteJob, getJobs, postJob, updateStatus } from "@/lib/api";

type JobState = {
    jobs: Job[];    
    optimisticJobs: Job[];
    loading: boolean,
    fetchJobs: () => Promise<void>;
    handleAddJob: (jobData: Partial<Job>) => Promise<void>;
    handleDeleteJob: (id: number) => Promise<void>;
    handleUpdateStatus: (id: number, newStatus: string) => Promise<void>;
    fetchComments: (id: number) => Promise<void>;
    handleAddComment: (id: number, comment: string) => Promise<void>;
  };


  export const useJobStore = create<JobState>((set) => ({
    jobs: [],
    optimisticJobs: [],
    loading: true,
    fetchJobs: async () => {
      set({ loading: true });
      try {
        const jobsData = await getJobs();
        set({ jobs: jobsData, optimisticJobs: jobsData, loading: false });
      } catch (error) {
        console.log("Failed to fetch jobs:", error);
        set({ loading: false });
      }

    },
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
      // Step 1: Optimistically update status
      set((state) => ({
        optimisticJobs: state.optimisticJobs.map((job) =>
          job.id === id ? { ...job, status: newStatus } : job
        ),
      }));
    
      try {
        // Step 2: Make API request to update job
        const updatedJob = await updateStatus(id, newStatus);
    
        // Step 3: Merge updated fields with existing job
        set((state) => {
          const mergeUpdate = (jobList: typeof state.jobs) =>
            jobList.map((job) =>
              job.id === id
                ? { ...job, ...updatedJob } // merge the updated fields into the old job
                : job
            );
    
          return {
            jobs: mergeUpdate(state.jobs),
            optimisticJobs: mergeUpdate(state.optimisticJobs),
          };
        });
      } catch (error) {
        console.error("❌ Failed to update job status:", error);
      }
    },
    
    fetchComments: async (id) => {
      try {
        const comments = await getComments(id); // returns only comments array
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id ? { ...job, comments } : job
          ),
          optimisticJobs: state.optimisticJobs.map((job) =>
            job.id === id ? { ...job, comments } : job
          ),
        }));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    },
    handleAddComment: async (id, comment) => {
      const tempComment = { content: comment, __optimistic: true };
    
      // 1. Optimistically add the placeholder comment
      set((state) => {
        const updatedJobs = state.optimisticJobs.map((job) => {
          if (job.id === id) {
            return {
              ...job,
              comments: [...(job.comments || []), tempComment],
            };
          }
          return job;
        });
    
        return { optimisticJobs: updatedJobs };
      });
    
      try {
        // 2. Persist comment in DB
        const realComment = await addComment(id, comment);
    
        // 3. Replace the optimistic comment with real one
        set((state) => {
          const update = (jobs: typeof state.jobs) =>
            jobs.map((job) =>
              job.id === id
                ? {
                    ...job,
                    comments: [
                      ...(job.comments || []).filter((c) => !('__optimistic' in c)),
                      realComment,
                    ],
                  }
                : job
            );
    
          return {
            jobs: update(state.jobs),
            optimisticJobs: update(state.optimisticJobs),
          };
        });
      } catch (err) {
        console.error("❌ Failed to add comment:", err);
      }
    }
    
    
  })); 