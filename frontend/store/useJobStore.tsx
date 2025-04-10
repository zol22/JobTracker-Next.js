/* Calls function from /lib/api.tsx to Fetch */
import { create } from 'zustand'
import { Job, JobStats, Affirmation} from '@/types'
import { addComment, getComments, deleteJob, getJobs, getJobStats, postJob, updateStatus } from "@/lib/api";
import { getAffirmation, postAffirmation, updateAffirmation, deleteAffirmation } from "../lib/affirmationandreminders"

type JobState = {
    jobs: Job[];    
    optimisticJobs: Job[];
    loading: boolean,
    selectedTab:string;
    setSelectedTab: (tab:string) => void;
    fetchJobs: () => Promise<void>;
    handleAddJob: (jobData: Partial<Job>) => Promise<void>;
    handleDeleteJob: (id: number) => Promise<void>;
    handleUpdateStatus: (id: number, newStatus: string) => Promise<void>;
    fetchComments: (id: number) => Promise<void>;
    handleAddComment: (id: number, comment: string) => Promise<void>;
    affirmations: Affirmation[];
    fetchAffirmations: () => Promise<void>;
    handleAddAffirmation: (affirmationData: Partial<Affirmation>) => Promise<void>;
    handleUpdateAffirmation: (id: string, content: string) => Promise<void>;
    handleDeleteAffirmation: (id: string) => Promise<void>;
    jobStats: JobStats[],
    fetchJobStats: () => Promise<void>;
  };


  export const useJobStore = create<JobState>((set) => ({
    jobs: [],
    optimisticJobs: [],
    loading: true,
    selectedTab: "AllJobs",
    setSelectedTab: (tab) => set({ selectedTab: tab }),
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
    },
    affirmations: [],
    fetchAffirmations: async () => {  
      try {
        const affirmations = await getAffirmation();
        set((state) => ({
          affirmations: [...state.affirmations, ...affirmations],
        }));
        
        console.log("Affirmations fetched successfully:", affirmations);
      } catch (error) {
        console.error("Failed to fetch affirmations:", error);
        
      }
    },
    handleAddAffirmation: async (affirmationData) => {
      try {
        console.log( `This is the affirmation passed it as parameter, ${JSON.stringify(affirmationData)}`)

        const newAffirmation = await postAffirmation(affirmationData);
        console.log( `This is the affirmation returned from database, ${JSON.stringify(affirmationData)}`)

        set((state) => ({
          affirmations: [...state.affirmations, newAffirmation],
        }));
      } catch (error) {
        console.error("Failed to add affirmation:", error);
      }
    },
    handleUpdateAffirmation: async (id, content) => {
      try {
        const updatedAffirmation = await updateAffirmation(id, content);
        set((state) => ({
          affirmations: state.affirmations.map((affirmation) =>
            affirmation.id === id ? updatedAffirmation : affirmation
          ),
        }));
      } catch (error) {
        console.error("Failed to update affirmation:", error);
      }     
    },
    handleDeleteAffirmation: async (id) => {
      try {
        await deleteAffirmation(id);
        set((state) => ({
          affirmations: state.affirmations.filter(
            (affirmation) => affirmation.id !== id
          ),
        }));
      } catch (error) {
        console.error("Failed to delete affirmation:", error);
      }
    },
    jobStats: [],
    fetchJobStats: async () => {
      try {
        const stats = await getJobStats();
        set({ jobStats: stats });
      } catch (error) {
        console.log("Failed to fetch job stats:", error);
      }
    }
    
    
  })); 