import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const markdownSchema: yup.AnyObjectSchema = yup.object().shape({
  markdown: yup.string(),
});

export interface IMarkdownFields extends FieldValues {
  markdown: string;
}

export const useRegisterMarkdown = () => {
  const { handleSubmit, control, formState, watch } = useForm<IMarkdownFields>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(markdownSchema),
  });

  const onSubmit = async (formValues: IMarkdownFields): Promise<void> => {
    console.log(formValues);
  };

  return {
    control,
    watch,
    errors: formState.errors,
    onSubmit: handleSubmit(onSubmit),
  };
};
