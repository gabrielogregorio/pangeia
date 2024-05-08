import { findDocByTags } from '@/components/findDocByTags';
import { DataContext } from '@/contexts/dataProvider';
import { docSelectedContext } from '@/contexts/docSelectedProvider';
import { useContext, useEffect, useState } from 'react';

export const useUrlChange = () => {
  const [url, setUrl] = useState(window.location.href);
  const { setDocSelected, docSelected } = useContext(docSelectedContext);
  const { data } = useContext(DataContext);

  useEffect(() => {
    const handleUrlChange = () => {
      setUrl(window.location.href);
    };

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  useEffect(() => {
    const currentUrl = new URL(url).pathname
      .split('/')
      .slice(1)
      .map((item) => decodeURIComponent(item));

    // refactor-me
    if (JSON.stringify(currentUrl) === JSON.stringify(docSelected?.tags)) {
      return;
    }

    const postFounded = findDocByTags(data, currentUrl);
    if (postFounded) {
      setDocSelected(postFounded);
    }
  }, [data]);
  return url;
};
