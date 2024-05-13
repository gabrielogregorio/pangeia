// import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
// import { modalControllerType } from '@/hooks/useModalController';
// import { IGtaPersonFields, useRegisterGtaPerson } from '@/hooks/x';
// import { TextArea } from '@/components/base/textArea';

// type Props = {
//   controller: modalControllerType;
// };

// export const Modal = ({ controller }: Props) => {
//   const { control } = useRegisterGtaPerson();
//   return (
//     <>
//       <Transition appear show={controller.isOpen}>
//         <Dialog as="div" className="relative z-10 focus:outline-none" onClose={controller.close}>
//           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4">
//               <TransitionChild
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 transform-[scale(95%)]"
//                 enterTo="opacity-100 transform-[scale(100%)]"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 transform-[scale(100%)]"
//                 leaveTo="opacity-0 transform-[scale(95%)]">
//                 <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
//                   <DialogTitle as="h3" className="text-base/7 font-medium text-white">
//                     Editor de markdown
//                   </DialogTitle>
//                   <p className="mt-2 text-sm/6 text-white/50">
//                     <TextArea<IGtaPersonFields> control={control} name="" />
//                   </p>
//                   <div className="mt-4">
//                     <Button
//                       className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
//                       onClick={controller.close}>
//                       close
//                     </Button>
//                   </div>
//                 </DialogPanel>
//               </TransitionChild>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };
