/* eslint-disable max-lines-per-function */
import { ReactElement, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/themProvider';
import { IconDark, IconLight } from '@/icons/index';
import { ModeContext } from '@/contexts/devProvider';
import { useRegisterMode } from '@/layout/useToogleMode';
import { DropDown, dataDropDownType } from '@/components/base/dropdown';
import { ModeTypeEnum } from '@/contexts/types';
import { ColorsContext, colorKeys, colors } from '@/contexts/colorsProvider';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const dataMode: dataDropDownType[] = [
  { value: ModeTypeEnum.product, children: '⭐ Modo Padrão' },
  { value: ModeTypeEnum.dev, children: '🧑‍💻 Modo Dev' },
  {
    value: ModeTypeEnum.debug,
    children: '🐛 Modo Debug',
  },
];

export const Actions = (): ReactElement => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { mode, updateTo } = useContext(ModeContext);
  const { updateToColor, colorSelected } = useContext(ColorsContext);
  const styleTheme = theme === 'white' ? 'left-0' : 'translate-x-10';
  const [colorsIsOpen, setColorsIsOpen] = useState(false);
  const ref = useOutsideClick(() => setColorsIsOpen(false));

  const { control, setValue, watch } = useRegisterMode();

  useEffect(() => {
    setValue('mode', mode);
  }, []);

  const modeUpdated = watch('mode');
  useEffect(() => {
    updateTo(modeUpdated);
  }, [modeUpdated]);

  return (
    <div className="flex gap-2">
      <div className="flex gap-4 items-center">
        <DropDown control={control} name="mode" data={dataMode} className="" defaultValue={mode} />

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setColorsIsOpen((prev) => !prev)}
            key={'color'}
            title={`Cor ${'colorSelected'}`}
            style={{
              background: colorSelected?.['--primary-color-500'],
              borderColor: colorSelected?.['--primary-color-400'],
            }}
            className="min-w-[25px] min-h-[25px] text-white rounded-md border-2 block cursor-pointer"></button>

          {colorsIsOpen ? (
            <div className="absolute right-0 top-7 bg-primary-50 z-20 p-2 rounded-md min-w-[160px] border-4 border-primary-300 shadow-xl">
              <div className=" grid grid-cols-4 gap-3">
                {colorKeys.map((item) => {
                  return (
                    <div key={item}>
                      <button
                        type="button"
                        onClick={() => updateToColor(item)}
                        title={`Cor ${item}`}
                        style={{
                          background: colors[item]?.['--primary-color-500'],
                          borderColor: colors[item]?.['--primary-color-400'],
                        }}
                        className="min-w-[25px] min-h-[25px] text-white rounded-md border-2 block cursor-pointer"></button>
                    </div>
                  );
                })}
              </div>

              {/* <button
                className="!text-primary-100 dark:text-white text-sm text-center bg-primary-500 hover:bg-primary-700 transition-all duration-150 active:scale-95 w-full px-2 py-1 rounded-md"
                type="button">
                mudar sempre - implementar no futuro
              </button> */}
            </div>
          ) : undefined}
        </div>

        <div>
          <button
            type="button"
            data-testid="change-theme"
            onClick={(): void => toggleTheme()}
            className="bg-primary-600 dark:bg-primary-600 ring-primary-600 dark:ring-primary-600 ring-2 w-16 flex rounded-xl relative select-none">
            <div
              className={`h-full aspect-square rounded-full bg-white-smooth absolute transition-all duration-150 top-0 ${styleTheme}`}
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
    </div>
  );
};
