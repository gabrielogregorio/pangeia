import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSyncUrlWithList = () => {
  const { docSelected } = useContext(DocSelectedContext);
  const navigate = useNavigate();

  useEffect(() => {
    const paths = docSelected?.tags;
    if (!paths?.length) {
      return;
    }

    const pathString = `/${paths.map((url) => encodeURIComponent(url)).join('/')}`;

    navigate(pathString);
  }, [docSelected?.tags, navigate]);
};
