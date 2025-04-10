const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-indigo-500 animate-pulse shadow-lg"></div>
      </div>
    </div>
  );
};

export default Spinner;
