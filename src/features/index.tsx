import { Modal } from '@/widgets/modal';
import { useContext } from 'react';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { modalControllerType } from '@/hooks/useModalController';
import { ICreateAndUpdateComments, IResponseComments } from '@/features/services/comments';
import { Comments } from '@/features/Comments';

export const ModalComments = ({
  controller,
  getByPostId,
  comments,
  createComment,
  error,
  isLoading,
}: {
  controller: modalControllerType;
  createComment: (payload: ICreateAndUpdateComments, onSuccess: () => void) => void;
  comments: IResponseComments[];
  error: string;
  isLoading: boolean;
  getByPostId: (postId: string) => void;
}) => {
  const { docSelected } = useContext(DocSelectedContext);
  const postId = docSelected?.id;

  return (
    <Modal
      title="Editor de markdown"
      controller={controller}
      className="backdrop-blur-2xl min-w-[500px] max-w-[500px] shadow-lg">
      {postId ? (
        <Comments
          createComment={createComment}
          error={error}
          isLoading={isLoading}
          comments={comments}
          getByPostId={getByPostId}
          postId={postId}
        />
      ) : undefined}
    </Modal>
  );
};
