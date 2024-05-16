import { ReactElement, useContext } from 'react';
import { ThemeContext } from '@/contexts/themProvider';
import { IconDark, IconLight } from '@/icons/index';
import { ModeContext } from '@/contexts/devProvider';
import { FaMarkdown } from 'react-icons/fa6';
import { useModalController } from '@/hooks/useModalController';
import { ModalMarkdown } from '@/widgets/modalMarkdown';

export const Actions = (): ReactElement => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { mode, toggleMode } = useContext(ModeContext);
  const styleTheme = theme === 'white' ? 'left-0' : 'translate-x-10';
  const styleMode = mode === 'dev' ? 'left-0' : 'translate-x-10';

  const controller = useModalController();

  return (
    <div className="flex gap-2">
      <ModalMarkdown controller={controller} />
      <div>
        <button
          type="button"
          data-testid="change-theme"
          onClick={(): void => controller.open()}
          className="bg-cyan-700 dark:bg-cyan-600 dark:ring-cyan-600 ring-cyan-700 ring-2 rounded-xl flex items-center justify-center px-3 h-full max-h-[32px]">
          <FaMarkdown className="h-[25px]" />
        </button>
      </div>

      <div className="pl-4">
        <button
          type="button"
          data-testid="change-theme"
          onClick={(): void => toggleMode()}
          className="bg-cyan-700 dark:bg-cyan-600 dark:ring-cyan-600 ring-cyan-700 ring-2 w-16 flex rounded-xl relative select-none">
          <div
            className={`h-full aspect-square rounded-full bg-white absolute transition-all duration-150 top-0 ${styleMode}`}
          />

          <div className="flex-1 flex items-center justify-center">
            <div className="text-[12px] flex items-center justify-center h-[25px]">🧑‍💻</div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-[12px] flex items-center justify-center h-[25px]">⭐</div>
          </div>
        </button>
      </div>

      <div className="pl-4">
        <button
          type="button"
          data-testid="change-theme"
          onClick={(): void => toggleTheme()}
          className="bg-cyan-700 dark:bg-cyan-600 dark:ring-cyan-600 ring-cyan-700 ring-2 w-16 flex rounded-xl relative select-none">
          <div
            className={`h-full aspect-square rounded-full bg-white absolute transition-all duration-150 top-0 ${styleTheme}`}
          />

          <div className="flex-1 p-1 flex items-center justify-center">
            <IconLight />
          </div>

          <div className="flex-1 p-1 flex items-center justify-center">
            <IconDark />
          </div>
        </button>
      </div>
    </div>
  );
};
