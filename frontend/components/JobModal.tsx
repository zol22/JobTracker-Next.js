// components/JobModal.tsx
import { useState } from "react";
import { Job } from "../types";

type JobModalProps = {
  job: Job;
  onClose: () => void;
  onUpdateStatus: (id: number, status: string) => void;
  onAddComment: (id: number, comment: string) => void;
};

const JobModal = ({ job, onClose, onUpdateStatus, onAddComment }: JobModalProps) => {
  const [comment, setComment] = useState("");

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-3/4 shadow-lg">
        <h3 className="text-lg font-bold mb-2">{job.title}</h3>
        <p className="text-sm mb-4">{job.company}</p>
        <p className="text-sm mb-4">{job.description}</p>
        <h4 className="text-md font-semibold">Status</h4>
        <select
          value={job.status}
          onChange={(e) => onUpdateStatus(job.id, e.target.value)}
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
