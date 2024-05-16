import { MutableRefObject, useEffect, useRef } from 'react';

type useOutsideClickResponseType = MutableRefObject<HTMLDivElement | null>;

export const useOutsideClick = (callback: () => void): useOutsideClickResponseType => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const existsReference = ref.current;
      const actualReferencesContainsTargetClicked = !ref?.current?.contains(event.target as Node);

      const wasClickedOutsideReference = existsReference && actualReferencesContainsTargetClicked;
      if (wasClickedOutsideReference) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
};
