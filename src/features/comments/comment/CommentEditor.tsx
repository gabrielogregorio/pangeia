import { useComments } from '../useComments';
import { FaSave } from 'react-icons/fa';
import { TextArea } from '@/components/base/TextArea';
import { ICommentFields } from '../useFormComments';
import { IoMdClose } from 'react-icons/io';
import { useEffect } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

type Props = {
  message: string;
  postId: string;
  commentId: string;
  setIsInEditing: React.Dispatch<React.SetStateAction<boolean>>;
  getByPostId: (postId: string) => void;
  setValue: UseFormSetValue<ICommentFields>;
  watch: UseFormWatch<ICommentFields>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ICommentFields, any>;
};

export const CommentEditor = ({
  commentId,
  message,
  getByPostId,
  postId,
  setIsInEditing,
  control,
  setValue,
  watch,
}: Props) => {
  const { updateById } = useComments();

  useEffect(() => {
    const updateLocalCommentToExternalComment = () => {
      setValue('comment', message);
    };

    updateLocalCommentToExternalComment();
  }, [message, setValue]);

  const commentUpdated = watch('comment');

  const handleCloseEditMode = () => {
    setIsInEditing(false);
  };

  const handleUpdateCommentById = () => {
    handleCloseEditMode();

    updateById({
      commentId: commentId,
      payload: { postId, message: commentUpdated },
      onSuccess: () => getByPostId(postId),
    });
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <TextArea<ICommentFields> control={control} name="comment" />
      </div>

      <div className="flex items-center justify-end pt-3 gap-2">
        <button
          type="button"
          aria-label="Sair do modo edição"
          className="hover:bg-primary-200 dark:hover:bg-primary-600 px-2 py-1 rounded-md"
          onClick={handleCloseEditMode}>
          <IoMdClose />
        </button>

        <button
          type="button"
          aria-label="Salvar edição"
          className="hover:bg-primary-200 dark:hover:bg-primary-600 px-2 py-1 rounded-md"
          onClick={handleUpdateCommentById}>
          <FaSave />
        </button>
      </div>
    </div>
  );
};
