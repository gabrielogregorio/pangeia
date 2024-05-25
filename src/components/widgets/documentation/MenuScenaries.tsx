import { ReactElement } from 'react';

type MenuScenariesProps = {
  onClick: () => void;
  isSelected: boolean;
  text: number;
};

export const MenuScenaries = ({ onClick, isSelected, text }: MenuScenariesProps): ReactElement => {
  const styleIsCaseSelected: string = isSelected
    ? 'border-b-4 border-b-cyan-500 bg-gray-100 dark:bg-[#282A36]'
    : 'border-b-4 border-b-gray-200 dark:border-b-gray-600 dark:bg-dark';

  return (
    <button
      type="button"
      title={text?.toString()}
      onClick={(): void => onClick()}
      className={`p-2 py-1.5 flex justify-center items-center group ${styleIsCaseSelected} hover:border-b-cyan-500`}>
      <div className="py-2 px-3">
        <div className="flex items-center dark:text-gray-200 text-gray-600 group-hover:text-cyan-500 font-bold">
          <span>{text}</span>
        </div>
      </div>
    </button>
  );
};
