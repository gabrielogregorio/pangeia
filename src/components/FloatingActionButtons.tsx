import { useContext, useEffect } from 'react';
import { LateralButton } from './LateralButton';
import { MdMessage } from 'react-icons/md';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { useModalController } from '@/hooks/useModalController';
import { useComments } from '@/features/useComments';
import { ModalComments } from '@/features/index';

export const FloatingActionButtons = () => {
  const { docSelected } = useContext(DocSelectedContext);
  const controller = useModalController();
  const { getByPostId, comments, createComment, isLoading, error } = useComments();
  const postId = docSelected?.id;

  useEffect(() => {
    if (postId) {
      getByPostId(postId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <div>
      {postId && controller.isOpen ? (
        <ModalComments
          createComment={createComment}
          error={error}
          isLoading={isLoading}
          comments={comments}
          getByPostId={getByPostId}
          controller={controller}
        />
      ) : undefined}

      <aside aria-label="Menu atalhos" className="fixed z-30 right-2 bottom-[6rem] flex items-center justify-center">
        {postId ? (
          <div className="relative">
            <LateralButton
              action={() => {
                controller.toggle();
              }}
              ariaLabel="Fazer comentário"
              variant={'cyan'}
              icon={<MdMessage className="text-2xl" />}
            />
            {comments.length ? (
              <div className="absolute text-white text-sm bg-cyan-800 rounded-full w-4 h-4 flex items-center justify-center right-2 bottom-0">
                {comments.length}
              </div>
            ) : undefined}
          </div>
        ) : undefined}
      </aside>
    </div>
  );
};
