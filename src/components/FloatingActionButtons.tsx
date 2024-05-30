import { useContext, useEffect } from 'react';
import { LateralButton } from './LateralButton';
import { MdMessage } from 'react-icons/md';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { useModalController } from '@/hooks/useModalController';
import { useComments } from '@/features/comments/useComments';
import { ModalComments } from '@/features/comments/index';
import { ModalMarkdown } from '@/widgets/modalMarkdown';
import { FaMarkdown } from 'react-icons/fa6';

export const FloatingActionButtons = () => {
  const { docSelected } = useContext(DocSelectedContext);
  const controller = useModalController();
  const { getByPostId, comments, createComment, isLoading, error } = useComments();
  const postId = docSelected?.id;

  const controllerMarkdown = useModalController();

  useEffect(() => {
    if (postId) {
      getByPostId({ postId });
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

      <ModalMarkdown controller={controllerMarkdown} />

      <aside
        aria-label="Menu atalhos"
        className="fixed z-30 right-2 bottom-[2rem] flex items-center justify-center flex-col gap-4">
        {postId ? (
          <div className="relative">
            <LateralButton
              action={() => {
                controller.toggle();
              }}
              ariaLabel="Fazer comentário"
              variant={'primary'}
              icon={<MdMessage className="text-2xl" />}
            />
            {comments.length ? (
              <div className="absolute text-white-smooth text-sm bg-primary-700 rounded-full w-4 h-4 flex items-center justify-center right-2 bottom-0">
                {comments.length}
              </div>
            ) : undefined}
          </div>
        ) : undefined}

        <div className="relative">
          <LateralButton
            action={() => {
              controllerMarkdown.toggle();
            }}
            ariaLabel="Fazer comentário"
            variant={'primary'}
            icon={<FaMarkdown className="text-2xl" />}
          />
        </div>
      </aside>
    </div>
  );
};
