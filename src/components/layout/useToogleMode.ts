import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ModeTypeEnum } from '@/contexts/types';

export const modeSchema: yup.AnyObjectSchema = yup.object().shape({
  mode: yup.string(),
});

export interface IModeFields extends FieldValues {
  mode: ModeTypeEnum;
}

export const useRegisterMode = () => {
  const { handleSubmit, control, formState, watch, setValue } = useForm<IModeFields>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(modeSchema),
  });

  const onSubmit = async (formValues: IModeFields): Promise<void> => {
    console.log(formValues);
  };

  return {
    control,
    setValue,
    watch,
    errors: formState.errors,
    onSubmit: handleSubmit(onSubmit),
  };
};
