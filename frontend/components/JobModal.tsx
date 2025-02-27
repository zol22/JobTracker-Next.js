// components/JobModal.tsx
import { useState, useOptimistic, startTransition, useEffect} from "react";
import { Job } from "../types";

type JobModalProps = {
  jobId: number; // ✅ Use jobId instead of a static job
  jobs: Job[]; // ✅ Receive the updated jobs list
  onClose: () => void;
  onUpdateStatus: (id: number, status: string) => void;
  onAddComment: (id: number, comment: string) => void;
};

const JobModal = ({ jobId, jobs, onClose, onUpdateStatus, onAddComment }: JobModalProps) => {
  
  const [comment, setComment] = useState("");

  // Find the latest job using jobId
  const job = jobs.find((j) => j.id === jobId);

  // If job is not found (due to deletion), close modal automatically
  useEffect(() => {
    if (!job) {
      onClose();
    }
  }, [job]);

  if (!job) return null; // Ensure job exists before rendering

  // ✅ Step 1: Sync the modal state with the job's latest status
  useEffect(() => {
    startTransition(() => {
      updateOptimisticStatus(job.status);
    });
  }, [job.status]); // ✅ This ensures the dropdown updates when status changes in JobList

  // ✅ Step 2: Optimistic UI for status updates inside the modal
  const [optimisticStatus, updateOptimisticStatus] = useOptimistic<string, string>(
    job.status,
    (_prevStatus, newStatus) => newStatus
  );


  console.log(`This is the optimistic status from JobModal: ${optimisticStatus}`)

  const handleStatusChange =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    
    // ✅ Step 3: Update the dropdown instantly before API request
    startTransition(() => {
      updateOptimisticStatus(newStatus); // Instant UI update
    });

    // ✅ Step 4: Call parent function to update job list globally
    onUpdateStatus(job.id, newStatus); // Persist to backend
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-3/4 shadow-lg">
        <h3 className="text-lg font-bold mb-2">{job.title}</h3>
        <p className="text-sm mb-4">{job.company}</p>
        <p className="text-sm mb-4">{job.description}</p>
        <h4 className="text-md font-semibold">Status</h4>
        <select
          value={optimisticStatus}
          onChange={handleStatusChange}
          className="border p-2 w-full mb-4"
        >
          <option value="Applied">Applied</option>
          <option value="Viewed">Viewed</option>
          <option value="Resume Downloaded">Resume Downloaded</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Second Round Interview">Second Round Interview</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>
        <h4 className="text-md font-semibold">Comments</h4>
        <ul className="list-disc ml-4 mb-4">
          {job.comments && job.comments.length > 0 ? (
            job.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))
          ) : (
            <li>No comments yet</li>
          )}
        </ul>
        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700"
            onClick={() => {
              onAddComment(job.id, comment);
              setComment("");
            }}
          >
            Add Comment
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
