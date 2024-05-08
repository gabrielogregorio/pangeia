type Props = {
  isLoading: boolean;
  error: string;
};

export const Status = ({ isLoading, error }: Props) => {
  if (isLoading) {
    return <div className="my-8 animate-spin border-4 border-transparent border-t-[#0e7490] rounded-full w-16 h-16" />;
  }

  if (error) {
    return (
      <div className="my-8 w-full text-center bg-red-400 px-6 py-4 text-base text-white animate-fadeIn font-sans rounded-md shadow-md">
        Error fetch request
      </div>
    );
  }

  return <div></div>;
};
