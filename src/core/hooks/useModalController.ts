import { useCallback, useEffect, useState } from 'react';

type paramsType = {
  firstRenderOpenState?: boolean;
  syncOpenStateTo?: boolean;
};

export type modalControllerType = {
  close: () => void;
  open: () => void;
  isOpen: boolean;
};

export const useModalController = ({
  firstRenderOpenState = false,
  syncOpenStateTo = undefined,
}: paramsType = {}): modalControllerType => {
  const [isOpen, setIsOpen] = useState(firstRenderOpenState);

  useEffect(() => {
    if (syncOpenStateTo !== undefined) {
      setIsOpen(syncOpenStateTo);
    }
  }, [syncOpenStateTo]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { close, open, isOpen };
};
