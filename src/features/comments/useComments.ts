import { useStatus } from '@/hooks/useStatus';
import { CommentsService, ICreateAndUpdateComments, IResponseComments } from './services/comments';
import { useState } from 'react';

export const useComments = () => {
  const { error, isLoading, startFetch, setErrorMessage, setIsLoading } = useStatus();
  const [comments, setComments] = useState<IResponseComments[]>([]);

  const createComment = ({ onSuccess, payload }: { payload: ICreateAndUpdateComments; onSuccess: () => void }) => {
    startFetch();

    CommentsService.create(payload)
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message || 'Erro ao adicionar comentário');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getAll = () => {
    startFetch();

    CommentsService.getAll()
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message || 'Erro ao obter comentários');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getByPostId = ({ postId }: { postId: string }) => {
    startFetch();

    CommentsService.getByPostId(postId)
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message || 'Erro ao obter comentários pelo id do post');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateById = ({
    commentId,
    onSuccess,
    payload,
  }: {
    commentId: string;
    payload: ICreateAndUpdateComments;
    onSuccess: () => void;
  }) => {
    startFetch();

    CommentsService.update(commentId, payload)
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message || 'Erro ao atualizar o comentário');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteById = ({ commentId, onSuccess }: { commentId: string; onSuccess: () => void }) => {
    startFetch();

    CommentsService.delete(commentId)
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message || 'Erro ao deletar commentario pelo id');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    error,
    getAll,
    deleteById,
    updateById,
    getByPostId,
    comments,
    isLoading,
    createComment,
  };
};
