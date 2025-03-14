// components/JobModal.tsx
import { useState, useRef, useOptimistic, startTransition, useEffect} from "react";
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
  const modalRef = useRef<HTMLDivElement>(null); // Ref for modal container

  // Find the latest job using jobId
  const job = jobs.find((j) => j.id === jobId);

  // ✅ Ensure Hooks always run by using a fallback job
  const fallbackJob = { id: -1, title: "Unknown", company: "", description: "", status: "Unknown", comments: [] };
  const currentJob = job || fallbackJob; // Avoids conditional hook execution


  // ✅ Step 1: Optimistic UI for status updates inside the modal
  const [optimisticStatus, updateOptimisticStatus] = useOptimistic<string, string>(
    currentJob.status,
    (_prevStatus, newStatus) => newStatus
  );


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

  }, [job]); // ✅ Runs when `job` changes (or gets deleted)

  //if (!job) return null; // Ensure job exists before rendering


  console.log(`This is the optimistic status from JobModal: ${optimisticStatus}`)

  const handleStatusChange =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    
    // ✅ Step 2: Update the dropdown instantly before API request
    startTransition(() => {
      updateOptimisticStatus(newStatus); // Instant UI update
    });

    // ✅ Step 3: Call parent function to update job list globally
    onUpdateStatus(currentJob.id, newStatus); // Persist to backend
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-6 rounded-lg w-3/4 shadow-lg" onClick={(e) => e.stopPropagation()}>{/* Stop click events from propagating inside the modal */}
        <h3 className="text-lg font-bold mb-2">{currentJob.title}</h3>
        <p className="text-sm mb-4">{currentJob.company}</p>
        <p className="text-sm mb-4">{currentJob.description}</p>
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
          {currentJob.comments && currentJob.comments.length > 0 ? (
            currentJob.comments.map((comment, index) => (
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
              onAddComment(currentJob.id, comment);
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
