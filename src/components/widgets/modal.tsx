import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { modalControllerType } from '@/hooks/useModalController';
import { ReactNode } from 'react';
import { tailwindMerge } from '@/hooks/tailwindMerge';

type Props = {
  controller: modalControllerType;
  title: string;
  className?: string;
  children: ReactNode;
};

export const Modal = ({ controller, className = undefined, children }: Props) => {
  return (
    <>
      <Transition appear show={controller.isOpen}>
        <Dialog as="div" className="relative z-30 focus:outline-none" onClose={controller.close}>
          <div className="fixed inset-0 z-40 w-screen h-screen overflow-y-auto backdrop-blur-md flex items-center justify-center">
            <div className="flex items-center justify-center w-full">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]">
                <DialogPanel className={tailwindMerge(`w-full rounded-xl bg-white/5 backdrop-blur-2xl`, className)}>
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
