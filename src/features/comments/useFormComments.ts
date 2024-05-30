import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const commentSchema: yup.AnyObjectSchema = yup.object().shape({
  comment: yup.string(),
});

export interface ICommentFields extends FieldValues {
  comment: string;
}

export const useFormComment = () => {
  const { handleSubmit, control, formState, watch, setValue } = useForm<ICommentFields>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(commentSchema),
  });

  const onSubmit = async (formValues: ICommentFields): Promise<void> => {
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
