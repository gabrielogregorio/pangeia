import { useContext, useEffect, useState } from 'react';
import { SchemaType } from '@/interfaces/api';
import { DataContext } from '@/contexts/dataProvider';
import { getUrlApi } from './getUrlApi';
import axios from 'axios';
import { extractReferences } from '@/widgets/documentation/extractReferences';
import { findDocByTags } from '@/components/findDocByTags';

export const useFetchDocsAndSaveContext = () => {
  const { currentUrlOrigin } = getUrlApi();
  const { setData, setError, setIsLoading } = useContext(DataContext);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const dataApi = await axios.get<SchemaType[]>(`${currentUrlOrigin}`);

      let finalData = dataApi.data;

      let errorsSchemas: SchemaType['content'] = [];
      finalData.map((item) => {
        item.errors?.forEach((item2) => {
          errorsSchemas.push({
            markdown: `HANDLER ${item.handlerName} - ${item2}`,
            dynamicId: Math.random().toString(),
          });
        });
      });

      if (errorsSchemas.length) {
        finalData.unshift({
          originName: 'midgard-reports',
          title: '❌ Erros no midgard',
          dynamicId: Math.random().toString(),
          handlerName: 'frontend-anomalias-retornadas',
          tags: ['midgard', 'erro'],
          content: [
            {
              dynamicId: Math.random().toString(),
              markdown: '# Esse é um relatório de erros no midgard, o sistema que extrai as documentações dos projetos',
            },
            ...errorsSchemas,
          ],
        });
      }

      let errors: SchemaType['content'] = [];
      finalData.forEach((item) => {
        item.content.forEach((itemx) => {
          const references = extractReferences(itemx.markdown || '');
          references.forEach((itemRefence) => {
            if (itemRefence.type === 'reference') {
              const docByTagFounded = findDocByTags(finalData, itemRefence.reference.split('.'));
              if (!docByTagFounded) {
                errors.push({
                  dynamicId: Math.random().toString(),
                  markdown: `- ❌ [${item.originName}] Erro ao analisar "${item.title}"  com tags "${item.tags?.join('.')}", a referência "${itemRefence.reference}" do conteudo não foi encontrada, e está quebrada`,
                });
              }
            }
          });
        });
      });

      if (errors.length) {
        finalData.unshift({
          originName: 'yggdrasil-reports',
          title: '❌ Referências quebradas',
          dynamicId: Math.random().toString(),
          tags: ['referencias', 'erro'],
          handlerName: 'frontend-anomalias-referencias',
          content: [
            {
              dynamicId: Math.random().toString(),
              markdown:
                '# Esse é um relatório de referências quebradas\n Esses erros são acessos como o ref.algumaCoisa mas que não foi encontrado nenhuma referência para o path usado. Isso acontece por exemplo quando em uma documentação você usa um `ref.algoQueNãoExiste`. Essa pagina irá sumir assim que todas as referências forem resolvidas',
            },
            ...errors,
          ],
        });
      }

      setData(finalData);
    } catch (error) {
      setError('Erro ao fazer requisição');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
};
