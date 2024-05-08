import { useContext, useEffect, useState } from 'react';
import { SchemaType } from '@/interfaces/api';
import { DataContext } from '@/contexts/dataProvider';
import { getUrlApi } from './getUrlApi';
import axios from 'axios';

export const useFetchDocsAndSaveContext = () => {
  const { currentUrlOrigin } = getUrlApi();
  const { setData, setError, setIsLoading } = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    setError('');
    axios
      .get<SchemaType[]>(`${currentUrlOrigin}`)

      .then((dataApi) => {
        setData(dataApi.data);
      })
      .catch(() => {
        setError('Erro ao fazer requisição');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
};
