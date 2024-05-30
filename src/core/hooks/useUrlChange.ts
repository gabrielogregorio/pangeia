import { findDocByTags } from '@/components/findDocByTags';
import { DataContext } from '@/contexts/dataProvider';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useUrlChange = () => {
  const { setDocSelected, docSelected } = useContext(DocSelectedContext);
  const { data } = useContext(DataContext);
  const history = useLocation();
  const url = history.pathname;

  const path = url
    .split('/')
    .slice(1)
    .map((item) => decodeURIComponent(item))
    .filter((item) => item.trim());

  useEffect(() => {
    // refactor-me
    if (JSON.stringify(path) === JSON.stringify(docSelected?.tags) || path.length === 0) {
      return;
    }

    const postFounded = findDocByTags(data.schema, path);
    if (postFounded.length) {
      setDocSelected(postFounded[0]); // FIXME
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, url]);

  return path;
};
