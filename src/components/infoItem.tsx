import { ReactElement } from 'react';

export const InfoItem = ({
  isSelected,
  onClick,
  title,
}: {
  isSelected: boolean;
  onClick: () => void;
  title: string;
}): ReactElement => {
  const isSelectedStyle = isSelected ? 'dark:bg-gray-700 bg-gray-200' : '';

  return (
    <div
      className={`text-gray-700 hover:bg-gray-200 hover:dark:bg-gray-700 transition-colors duration-700 hover:duration-75 ${isSelectedStyle} rounded-md `}>
      <button
        type="button"
        onClick={(): void => onClick()}
        className="flex w-full cursor-pointer text-left dark:text-gray-200 text-gray-600 capitalize p-1.5 ">
        <div className="flex items-center flex-1">
          <pre className={`ml-2 flex-1 text-wrap select-none font-sans`}>{title}</pre>
        </div>
      </button>
    </div>
  );
};
