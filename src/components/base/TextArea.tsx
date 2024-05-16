import { Field, Textarea } from '@headlessui/react';
import { ReactElement } from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

interface IGenericInput<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, Path<T>>;
  rows?: number;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: PathValue<T, Path<T>>;
}

const DEFAULT_ROWS = 3;

export const TextArea = <T extends FieldValues>({
  name,
  disabled = false,
  control,
  placeholder = '',
  rows = DEFAULT_ROWS,
  defaultValue = undefined,
}: IGenericInput<T>): ReactElement => {
  const {
    field: { ref, value, onChange },
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
    <div className="w-ful">
      <Field>
        <Textarea
          id={name}
          name={name}
          disabled={disabled}
          autoComplete=""
          placeholder={placeholder}
          title="title on over mouse"
          value={value}
          aria-label="abc"
          onClick={() => console.log('on click event')}
          onChange={handleChange}
          onBlur={() => console.log('blur')}
          ref={ref}
          className={
            'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          }
          rows={rows}
        />
      </Field>
    </div>
  );
};
