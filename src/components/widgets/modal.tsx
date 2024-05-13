import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { modalControllerType } from '@/hooks/useModalController';
import { TextArea } from '@/components/base/TextArea';
import { useRegisterMarkdown, IMarkdownFields } from '@/hooks/useRegisterMarkdown';
import { MarkdownToHtml } from '@/shared/ReactMarkdown';

type Props = {
  controller: modalControllerType;
};

export const Modal = ({ controller }: Props) => {
  const { control, watch } = useRegisterMarkdown();

  const value = watch('markdown');
  return (
    <>
      <Transition appear show={controller.isOpen}>
        <Dialog as="div" className="relative z-30 focus:outline-none" onClose={controller.close}>
          <div className="fixed inset-0 z-40 w-screen h-screen overflow-y-auto backdrop-blur-md flex items-center justify-center">
            <div className="flex items-center justify-center p-4 bg-black w-[80%]">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]">
                <DialogPanel className="w-full rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                    Editor de markdown
                  </DialogTitle>

                  <TextArea<IMarkdownFields> control={control} name="markdown" rows={5} />

                  <div className="overflow-y-auto bg-white dark:bg-dark dark:text-white max-h-[20rem]">
                    <MarkdownToHtml mode="dev" body={value || ''} />
                  </div>

                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={controller.close}>
                      close
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
