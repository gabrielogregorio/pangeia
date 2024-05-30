import { useComments } from '../useComments';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { ICommentFields } from '../useFormComments';
import { UseFormSetValue } from 'react-hook-form';

type Props = {
  message: string;
  postId: string;
  commentId: string;
  getByPostId: (postId: string) => void;
  setValue: UseFormSetValue<ICommentFields>;
  setIsInEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setMoreOptionsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CommentOptions = ({
  commentId,
  message,
  getByPostId,
  postId,
  setValue,
  setIsInEditing,
  setMoreOptionsIsOpen,
}: Props) => {
  const { deleteById } = useComments();

  useEffect(() => {
    const updateLocalCommentToExternalComment = () => {
      setValue('comment', message);
    };

    updateLocalCommentToExternalComment();
  }, [message, setValue]);

  const handleDeleteById = () => {
    deleteById({
      commentId: commentId,
      onSuccess: () => getByPostId(postId),
    });
  };

  const handleCloseMoreOptions = () => {
    setMoreOptionsIsOpen(false);
  };

  const handleOpenEditMode = () => {
    setIsInEditing(true);
    handleCloseMoreOptions();
  };

  return (
    <div className="absolute bg-white-smooth dark:bg-dark-max min-w-[230px] text-base right-0 top-10 z-40 shadow-2xl border border-dark-max rounded-lg shadow-dark-max py-3">
      <button
        type="button"
        className="flex items-center gap-3 py-3 px-3 w-full hover:bg-primary-200 dark:hover:bg-primary-500"
        onClick={handleOpenEditMode}>
        <span>
          <FaRegEdit />
        </span>
        Editar...
      </button>

      <button
        type="button"
        className="flex items-center gap-3 py-3 px-3 w-full hover:bg-red-200 dark:hover:bg-red-500"
        onClick={handleDeleteById}>
        <span>
          <MdDelete />
        </span>
        <div className="whitespace-nowrap">Apagar Comentário</div>
      </button>
    </div>
  );
};
