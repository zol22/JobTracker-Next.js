// components/JobModal.tsx
import { useState, useRef, useOptimistic, startTransition, useEffect} from "react";
import { useJobStore } from "../store/useJobStore";
import { Job } from "../types";

type JobModalProps = {
  jobId: number; // ✅ Use jobId instead of a static job
  onClose: () => void;
};

const JobModal = ({ jobId, onClose }: JobModalProps) => {
  
  const { fetchComments, handleAddComment, jobs, handleUpdateStatus} = useJobStore();
  const [comment, setComment] = useState("");
  const modalRef = useRef<HTMLDivElement>(null); // Ref for modal container

  // Find the current job using jobId from Zustand Store
  const job = jobs.find((j) => j.id === jobId); 
  // Always execute hooks BEFORE any conditional return
  const [optimisticStatus, updateOptimisticStatus] = useOptimistic<string, string>(
    job?.status ?? "Unkown", // Initial status
    (_prevStatus, newStatus) => newStatus
  );

  console.log(" Job Id in Modal", jobId);
  console.log(" Job in Modal", job);

    // Fetch comments when modal opens
    useEffect(() => { // Fetch comments when modal is opened
      fetchComments(jobId);
    } , [jobId]); // ✅ Runs when `jobId` changes

    // Handle outside clicks to close modal
    useEffect(() => {
      // If job is not found (due to deletion), close modal automatically
      if (!job) {
        onClose();
        return
      }
      // Detect outside clicks to close modal
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []); // ✅ Runs when `job` changes (or gets deleted)

  const handleStatusChange =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    
    startTransition(() => {
      updateOptimisticStatus(newStatus); // Instant UI update
    });

    handleUpdateStatus(jobId, newStatus); // Persist to backend
  }

  if (!job) return <p className="text-center text-gray-500">Loading job...</p>;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-6 rounded-lg w-3/4 shadow-lg" onClick={(e) => e.stopPropagation()}>{/* Stop click events from propagating inside the modal */}
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
          {job.comments?.length > 0 ? (
            job.comments.map((comment, index) => (
              <li key={index}>{comment.content}</li>
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
              handleAddComment(jobId, comment);
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
