import { ReactElement } from 'react';

export type lateralButtonType = 'dark' | 'cyan' | 'blue';

const variantLateralButtonStyle: { [key in lateralButtonType]: string } = {
  dark: 'bg-dark text-white hover:bg-dark',
  cyan: 'bg-cyan-500 text-white hover:bg-cyan-500',
  blue: 'bg-blue-400 text-white hover:bg-blue-500',
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
        className={`${styleVariant} p-3 rounded-full transition-all duration-150 shadow-xl`}>
        {icon}
      </button>
    </div>
  );
};
