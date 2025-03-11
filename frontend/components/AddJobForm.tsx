import { useState } from 'react';

type AddJobFormProps = {
  onAdd: (jobData: { title: string; company: string; description: string; status?: string }) => void;
};

const AddJobForm = ({ onAdd }: AddJobFormProps) => { 
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState("");


  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAdd({ title, company, description, status: 'Applied' });
    setSuccessMessage(`✅ Job "${title}" at ${company} added successfully! Go to 'All Jobs' Tab to see it :)`);
    setTitle('');
    setCompany('');
    setDescription('');
    // Remove message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 6000);
  };

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white w-full">
      <h2 className="text-sm uppercase mb-4 tracking-wide text-gray-700 font-bold">Add New Job</h2>
      {/* ✅ Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-500 rounded-md">
          {successMessage}
        </div>
      )}
      <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center items-center">
        <div className='flex-1 min-w-[200px] px-3 mb-6 border-b border-gray-400 '>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Job Title</label>
          <input
            type="text"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>

        <div className='flex-1 min-w-[200px] px-3 mb-6 border-b border-gray-400'>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Company</label>
          <input
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>

        <div className='flex-1 min-w-[200px] px-3 mb-6 border-b border-gray-400'>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Job Description</label>
          <input
            type="text"
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>

        <div className='w-full md:w-1/2 px-3 mb-6 '>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className=" block w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
        </div>

        <div className="px-3 ">
          <button
            onClick={handleSubmit}
            className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700"
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
