import { modalControllerType } from '@/hooks/useModalController';
import { TextArea } from '@/components/base/TextArea';
import { useRegisterMarkdown, IMarkdownFields } from '@/hooks/useRegisterMarkdown';
import { MarkdownToHtml } from '@/shared/ReactMarkdown';
import { Modal } from '@/widgets/modal';
import { ModeTypeEnum } from '@/contexts/types';

type Props = {
  controller: modalControllerType;
};

export const ModalMarkdown = ({ controller }: Props) => {
  const { control, watch } = useRegisterMarkdown();

  const value = watch('markdown');
  return (
    <Modal title="Editor de markdown" controller={controller} className="bg-dark p-6 w-[80%]">
      <TextArea<IMarkdownFields> control={control} name="markdown" rows={5} />

      <div className="overflow-y-auto bg-white-smooth dark:bg-dark dark:text-white-smooth max-h-[20rem]">
        <MarkdownToHtml mode={ModeTypeEnum.dev} body={value || ''} />
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white-smooth shadow-inner shadow-white-smooth/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white-smooth hover:bg-primary-500 transition-colors duration-150"
          onClick={controller.close}>
          close
        </button>
      </div>
    </Modal>
  );
};
