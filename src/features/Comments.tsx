import { Comment } from './comment';
import { useEffect } from 'react';
import { TextArea } from '@/components/base/TextArea';
import { useRegisterAddComments } from '@/features/useRegisterAddComments';
import { ICommentFields } from '@/features/useRegisterComments';
import { IoSend } from 'react-icons/io5';
import { Status } from '@/components/base/Status';
import { PiFinnTheHumanFill } from 'react-icons/pi';
import { ICreateAndUpdateComments, IResponseComments } from '@/features/services/comments';

type Props = {
  postId: string;
  comments: IResponseComments[];
  getByPostId: (postId: string) => void;
  createComment: (payload: ICreateAndUpdateComments, onSuccess: () => void) => void;
  isLoading: boolean;
  error: string;
};

export const Comments = ({ getByPostId, postId, comments, createComment, error, isLoading }: Props) => {
  const { control, watch, setValue } = useRegisterAddComments();
  const message = watch('comment');

  useEffect(() => {
    getByPostId(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const buttonSendIsDisabled = Boolean(message) === false;

  return (
    <div className="shadow-lg shadow-dark text-dark/80 dark:text-white-smooth bg-white-smooth dark:bg-dark w-full rounded-lg max-h-[80vh] overflow-auto">
      <div className="px-3 py-4">Comentários</div>

      <div className="border-t border-gray-600 px-3 py-4 flex flex-col gap-4">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              id={comment._id}
              message={comment.message}
              getByPostId={getByPostId}
              postId={postId}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-start px-3 ">
        <div className="min-h-[25px] min-w-[25px] rounded-full border-2 border-dark/80 dark:border-white-smooth flex items-center justify-center">
          <PiFinnTheHumanFill />
        </div>

        <div className="ml-3 w-full">
          <TextArea<ICommentFields> control={control} name={'comment'} placeholder="Digite um comentário" />
        </div>
      </div>

      <div className="flex items-center justify-end pt-3 px-3 gap-2">
        <button
          type="button"
          aria-label="Cancelar"
          className=" disabled:hover:bg-transparent hover:bg-primary-300 dark:hover:bg-primary-600 px-2 py-1 rounded-md"
          disabled={buttonSendIsDisabled}
          onClick={() =>
            createComment(
              {
                message: message,
                postId,
              },
              () => {
                getByPostId(postId);
                setValue('comment', '');
              },
            )
          }>
          <IoSend className={buttonSendIsDisabled ? 'text-primary-200 dark:text-gray-600' : ''} />
        </button>
      </div>

      <div>
        <Status isLoading={isLoading} error={error} />
      </div>
      <div className="pt-3"></div>
    </div>
  );
};
