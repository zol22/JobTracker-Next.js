import { useState } from 'react';
import { BsFilePerson } from "react-icons/bs";
import { MdAddHomeWork } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr";


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
    <div className="mb-4 bg-neutral-100 w-full mt-4 p-6 rounded-lg shadow-lg">
      <h2 className=" uppercase mb-5 tracking-wide text-gray-700 font-bold  text-xl">Add New Job</h2>
      {/* ✅ Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-500 rounded-md">
          {successMessage}
        </div>
      )}
      <div className="flex flex-col  justify-center items-center">

        <div className=' flex justify-center items-center gap-x-2 md:gap-x-8 w-full md:w-[600px] px-3 mb-6 border-b border-gray-500 '>
          <div className='flex items-center gap-x-2  w-1/2 md:w-1/3'>
              <BsFilePerson />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">Job Title:</label>
          </div>
          <input
            type="text"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className= " text-sm sm:text-base appearance-none border border-gray-500 shadow-sm focus:shadow-md  focus:placeholder-gray-600 bg-transparent border-none rounded-md w-full text-gray-600 mr-3 py-3 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
          />
        </div>

        <div className=' flex justify-center items-center gap-x-2 md:gap-x-8  w-full md:w-[600px] px-3 mb-6 border-b border-gray-400'>
          <div className='flex items-center gap-x-2 w-1/2 md:w-1/3'>
              <MdAddHomeWork />
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">Company:</label>
            </div>
          <input
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="text-sm sm:text-base appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>

        <div className=' flex justify-center items-center gap-x-2 md:gap-x-8  w-full  md:w-[600px]  px-3 mb-6 border-b border-gray-400'>
          <div className='flex items-center gap-x-2  w-1/2 md:w-1/3'>
            <BiDetail />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">Description:</label>
          </div>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-sm sm:text-base appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>

        <div className='flex justify-center items-center gap-x-2 md:gap-x-8   w-full md:w-[600px] px-3 mb-6 '>
          <div className='flex items-center gap-x-2  w-1/2 md:w-1/3'>
            <GrStatusInfo />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">Status:</label>
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className=" block w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
