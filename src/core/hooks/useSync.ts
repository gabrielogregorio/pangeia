import { docSelectedContext } from '@/contexts/docSelectedProvider';
import { useContext, useEffect } from 'react';

export const useSyncUrlWithList = () => {
  const { docSelected } = useContext(docSelectedContext);

  useEffect(() => {
    const paths = docSelected?.tags;
    if (!paths?.length) {
      return;
    }
    const pathString = `/${paths.map((url) => encodeURIComponent(url)).join('/')}`;

    window.history.pushState({}, '', pathString);
  }, [docSelected?.tags]);
};
