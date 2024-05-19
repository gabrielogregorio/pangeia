import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const requestSchema: yup.AnyObjectSchema = yup.object().shape({
  url: yup.string(),
  method: yup.string(),
  payload: yup.string(),
  headers: yup.string(),
});

export interface IRequestFields extends FieldValues {
  url: string;
  method: string;
  payload: string;
  headers: string;
}

export const useRegisterRequestHandler = () => {
  const { handleSubmit, control, formState, watch, setValue } = useForm<IRequestFields>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(requestSchema),
  });

  const onSubmit = async (formValues: IRequestFields): Promise<void> => {
    console.log(formValues);
  };

  return {
    control,
    watch,
    setValue,
    errors: formState.errors,
    onSubmit: handleSubmit(onSubmit),
  };
};
