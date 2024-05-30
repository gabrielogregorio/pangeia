import { PiFinnTheHumanFill } from 'react-icons/pi';
import { useComments } from '../useComments';
import { SlOptionsVertical } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useFormComment } from '../useFormComments';
import { Status } from '@/components/base/Status';
import { CommentDisplay } from '@/features/comments/comment/CommentDisplay';
import { CommentEditor } from '@/features/comments/comment/CommentEditor';
import { CommentOptions } from '@/features/comments/comment/CommentOptions';

type Props = {
  message: string;
  postId: string;
  commentId: string;
  getByPostId: (postId: string) => void;
};

export const Comment = ({ commentId, message, getByPostId, postId }: Props) => {
  const { isLoading, error } = useComments();
  const [moreOptionsIsOpen, setMoreOptionsIsOpen] = useState<boolean>(false);
  const [isInEditing, setIsInEditing] = useState<boolean>(false);
  const { control, setValue, watch } = useFormComment();

  useEffect(() => {
    const updateLocalCommentToExternalComment = () => {
      setValue('comment', message);
    };

    updateLocalCommentToExternalComment();
  }, [message, setValue]);

  const handleCloseMoreOptions = () => {
    setMoreOptionsIsOpen(false);
  };

  const handleToggleOpenMoreOptions = () => {
    setMoreOptionsIsOpen((prev) => !prev);
  };

  const ref = useOutsideClick(() => {
    handleCloseMoreOptions();
  });

  return (
    <>
      <div className="flex items-center justify-start group">
        <div className="min-h-[25px] min-w-[25px] rounded-full border-2 border-white-smooth flex items-center justify-center">
          <PiFinnTheHumanFill />
        </div>

        <div className="ml-3 flex justify-center gap-3 w-full">
          {isInEditing ? (
            <CommentEditor
              key="comment-editor"
              commentId={commentId}
              control={control}
              getByPostId={getByPostId}
              message={message}
              postId={postId}
              setIsInEditing={setIsInEditing}
              setValue={setValue}
              watch={watch}
            />
          ) : (
            <CommentDisplay key="comment-display" message={message} />
          )}

          <div ref={ref}>
            <div className="relative">
              <button
                type="button"
                aria-label="Abrir opções"
                className="h-[100%] min-w-[30px] flex items-center justify-center min-h-[40px] hover:bg-primary-200 dark:hover:bg-primary-500 rounded-md"
                onClick={handleToggleOpenMoreOptions}>
                <SlOptionsVertical />
              </button>

              {moreOptionsIsOpen ? (
                <CommentOptions
                  key="comment-options"
                  commentId={commentId}
                  getByPostId={getByPostId}
                  message={message}
                  postId={postId}
                  setIsInEditing={setIsInEditing}
                  setMoreOptionsIsOpen={setMoreOptionsIsOpen}
                  setValue={setValue}
                />
              ) : undefined}
            </div>
          </div>
        </div>
      </div>

      <Status isLoading={isLoading} error={error} />
    </>
  );
};
