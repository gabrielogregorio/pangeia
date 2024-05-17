import { ReactElement } from 'react';

export type lateralButtonType = 'dark' | 'primary' | 'blue';

const variantLateralButtonStyle: { [key in lateralButtonType]: string } = {
  dark: 'bg-dark text-white-smooth hover:bg-dark',
  primary: 'bg-primary-500 text-white-smooth hover:bg-primary-500',
  blue: 'bg-blue-400 text-white-smooth hover:bg-blue-500',
};

interface ILateralButtonProps {
  ariaLabel: string;
  icon: ReactElement;
  action: () => void;
  variant: lateralButtonType;
}

export const LateralButton = ({ ariaLabel, icon, action, variant }: ILateralButtonProps) => {
  const styleVariant: string = variantLateralButtonStyle[variant] || '';

  return (
    <div>
      <button
        onClick={() => action()}
        type="button"
        aria-label={ariaLabel}
        className={`${styleVariant} p-3 rounded-full transition-all duration-150 shadow-xl min-w-[48px] min-h-[48px]`}>
        {icon}
      </button>
    </div>
  );
};
