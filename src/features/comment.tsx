/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { PiFinnTheHumanFill } from 'react-icons/pi';
import { useComments } from './useComments';
import { FaRegEdit, FaSave } from 'react-icons/fa';
import { SlOptionsVertical } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TextArea } from '@/components/base/TextArea';
import { ICommentFields, useRegisterComment } from './useRegisterComments';
import { IoMdClose } from 'react-icons/io';
import { Status } from '@/components/base/Status';

type Props = {
  message: string;
  postId: string;
  id: string;
  getByPostId: (postId: string) => void;
};

export const Comment = ({ id, message, getByPostId, postId }: Props) => {
  const { updateById, deleteById, isLoading, error } = useComments();
  const [moreOptionsIsOpen, setMoreOptionsIsOpen] = useState<boolean>(false);
  const ref = useOutsideClick(() => {
    setMoreOptionsIsOpen(false);
  });

  const [isInEditing, setIsInEditing] = useState<boolean>(false);
  const { control, setValue, watch } = useRegisterComment();

  useEffect(() => {
    setValue('comment', message);
  }, [message, setValue]);

  const commentUpdated = watch('comment');

  return (
    <div>
      <div className="flex items-center justify-start group ">
        <div className="min-h-[25px] min-w-[25px] rounded-full border-2 border-white-smooth flex items-center justify-center">
          <PiFinnTheHumanFill />
        </div>

        <div className="ml-3 flex justify-center gap-3 w-full">
          {isInEditing ? (
            <div className="w-full">
              <div className="w-full">
                <TextArea<ICommentFields> control={control} name={'comment'} />
              </div>

              <div className="flex items-center justify-end pt-3 gap-2">
                <button
                  type="button"
                  aria-label="Cancelar"
                  className="hover:bg-primary-200 dark:hover:bg-primary-600 px-2 py-1 rounded-md"
                  onClick={() => setIsInEditing(false)}>
                  <IoMdClose />
                </button>

                <button
                  type="button"
                  aria-label="Salvar"
                  className="hover:bg-primary-200 dark:hover:bg-primary-600 px-2 py-1 rounded-md"
                  onClick={() => {
                    setIsInEditing(false);
                    updateById(id, { postId, message: commentUpdated }, () => getByPostId(postId));
                  }}>
                  <FaSave />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 w-full px-3">{message}</div>
          )}

          <div ref={ref}>
            <div className="relative">
              <button
                type="button"
                aria-label="Abrir opções"
                className="h-[100%] min-w-[30px] flex items-center justify-center min-h-[40px] hover:bg-primary-200 dark:hover:bg-primary-500 rounded-md"
                onClick={() => setMoreOptionsIsOpen((prev) => !prev)}>
                <SlOptionsVertical />
              </button>

              {moreOptionsIsOpen ? (
                <div className="absolute bg-white-smooth dark:bg-dark-max min-w-[230px] text-base right-0 top-10 z-40 shadow-2xl border border-dark-max rounded-lg shadow-dark-max py-3">
                  <button
                    type="button"
                    className="flex items-center gap-3 py-3 px-3 w-full hover:bg-primary-200 dark:hover:bg-primary-500"
                    onClick={() => {
                      setIsInEditing(true);
                      setMoreOptionsIsOpen(false);
                    }}>
                    <span>
                      <FaRegEdit />
                    </span>

                    <div>Editar...</div>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-3 py-3 px-3 w-full hover:bg-red-200 dark:hover:bg-red-500"
                    onClick={() => {
                      deleteById(id, () => getByPostId(postId));
                    }}>
                    <span>
                      <MdDelete />
                    </span>
                    <div className="whitespace-nowrap">Apagar Comentário</div>
                  </button>
                </div>
              ) : undefined}
            </div>
          </div>
        </div>
      </div>

      <Status isLoading={isLoading} error={error} />
    </div>
  );
};
