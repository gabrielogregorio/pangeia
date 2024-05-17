import { tailwindMerge } from '@/hooks/tailwindMerge';
import { Select } from '@headlessui/react';
import { ReactElement, ReactNode } from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

export type dataDropDownType = { value: string; children: ReactNode };

interface IGenericInput<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, Path<T>>;
  className?: string;
  data: dataDropDownType[];
  defaultValue?: PathValue<T, Path<T>>;
}

export const DropDown = <T extends FieldValues>({
  name,
  control,
  className = undefined,
  data,
  defaultValue = undefined,
}: IGenericInput<T>): ReactElement => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <Select
      name={name}
      onChange={handleChange}
      value={value}
      className={tailwindMerge(
        'text-base bg-primary-600 dark:bg-primary-700 border-2 border-primary-600 dark:border-primary-600 rounded-md px-1 py-1',
        className,
      )}>
      {data.map((item) => {
        return (
          <option key={item.value} value={item.value} className="px-2 py-4">
            {item.children}
          </option>
        );
      })}
    </Select>
  );
};
