type StatusProps = {
  isLoading: boolean;
  error: string;
};

export const Status = ({ isLoading, error }: StatusProps) => {
  if (isLoading) {
    return (
      <div
        role="status"
        className="my-8 animate-spin border-4 border-transparent border-t-[#0e7490] rounded-full w-16 h-16">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="my-8 w-full text-center bg-red-400 px-6 py-4 text-base text-white animate-fadeIn font-sans rounded-md shadow-md">
        {error}
      </div>
    );
  }

  return <div></div>;
};
