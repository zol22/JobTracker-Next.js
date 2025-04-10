import { useEffect, useState } from "react";
import { useJobStore } from "@/store/useJobStore"; // Custom hook to manage job state
import { useUser } from "@clerk/nextjs"
import { Textarea } from "@headlessui/react";
const Affirmation = () => {
  const { user } = useUser()
  const { affirmations,fetchAffirmations, handleAddAffirmation, handleUpdateAffirmation, handleDeleteAffirmation } = useJobStore(); // Fetches the affirmation from the API.

  const [newAffirmation , setNewAffirmation] = useState("");
  const [ editingId, setEditingId] = useState<string | null>(null);
  const [ editContent, setEditContent] = useState("");


  // Fetch affirmations when the component mounts or when the user changes
  useEffect(() => {
    if (user?.id) {
      fetchAffirmations()
    }
  }, [user, fetchAffirmations]);


  // Function to handle the affirmation submission
  const handleSaveAffirmation = async() => {
    if (!newAffirmation.trim()) {
      return; // Prevent saving empty affirmations
    }
    await handleAddAffirmation({ content: newAffirmation });
    setNewAffirmation(""); // Clear the input field after saving  
    setEditingId(null); 
    setEditContent(""); 
    
  };

  const handleUpdate = async (id: string) => {
    if (!editContent.trim()) {
      return; // Prevent saving empty affirmations
    }
    await handleUpdateAffirmation(id, editContent);
    setEditingId(null); 
    setEditContent(""); 
  }

  const handleDelete = async (id: string) => {
    await handleDeleteAffirmation(id);
  };

  return (
    <div className="mb-4 bg-neutral-100 w-full mt-4 p-6 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className=" uppercase mb-5 tracking-wide text-gray-700 font-bold  text-xl">
          Today&apos;s Affirmation
        </h1>

      {/* Add Affirmation */}
      <div>
        <Textarea
          placeholder="Write your affirmation for today..."
          value={newAffirmation}
          onChange={(e) => setNewAffirmation(e.target.value)}
          className="w-full border border-neutral-300 rounded-lg p-3 text-sm text-neutral-700 focus:ring-2 focus:ring-neutral-500 focus:outline-none resize-none"
          rows={4}
        />
        <button 
          onClick={handleSaveAffirmation}
          className="bg-neutral-800 text-white rounded-lg my-4 hover:bg-neutral-700 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center focus:ring-4 focus:ring-indigo-300 dark:focus:bg-indigo-500 "
        >
          Add Affirmation
        </button>
      </div>

      {/* List Affirmations */}
      <ul className="space-y-4">
        { affirmations.map((affirmation) => (
          <li key={affirmation.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            {  editingId === affirmation.id ? (
              <>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-3 text-sm text-neutral-700 focus:ring-2 focus:ring-neutral-500 focus:outline-none resize-none"
                  rows={4}
                />
                <div className="flex gap-4 mt-2 ml-2 text-sm">
                  <button
                    onClick={() => handleUpdate(affirmation.id)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                      Save
                  </button>
                  <button 
                    className="text-red-600 font-medium hover:underline"
                    onClick={() => {
                      setEditingId(null);
                      setEditContent("");

                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ): (
              <>
                <p className="text-sm text-neutral-800 italic">{affirmation.content}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <button
                    onClick={() => {
                      setEditingId(affirmation.id);
                      setEditContent(affirmation.content);
                    }}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(affirmation.id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}

      </ul>
      </div>
  );
};

export default Affirmation;
