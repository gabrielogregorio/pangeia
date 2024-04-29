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
  const isSelectedStyle: string = isSelected ? 'dark:bg-gray-800 bg-gray-100' : '';
  return (
    <div className={`text-gray-700  ${isSelectedStyle}`}>
      <button
        type="button"
        onClick={(): void => onClick()}
        className="flex w-full cursor-pointer text-left dark:text-gray-200 text-gray-600 capitalize p-1.5 hover:bg-gray-600 hover:dark:bg-gray-700">
        <div className="flex items-center flex-1">
          <pre className={`ml-2 flex-1 select-none overflow-hidden text-ellipsis font-sans`}>{title}</pre>
        </div>
      </button>
    </div>
  );
};
