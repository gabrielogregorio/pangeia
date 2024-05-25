/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { SchemaType, responseApi } from '@/interfaces/api';
import { DataContext } from '@/contexts/dataProvider';
import { getUrlApi } from './getUrlApi';
import axios from 'axios';
import { extractReferences } from '@/widgets/documentation/extractReferences';
import { findDocByTags } from '@/components/findDocByTags';

const howResolveCodeWithoutLanguage = `
Para resolver esse problema, basta especificar uma linguagem na definição do código, tipo

    \`\`\`linguagemAquiComoTsJSPyBashEtc
    seuCodigo
    \`\`\`
`;

export const useFetchDocsAndSaveContext = () => {
  const { currentUrlOrigin } = getUrlApi();
  const { setData, setError, setIsLoading } = useContext(DataContext);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const base = await axios.get<responseApi>(`${currentUrlOrigin}`);
      const dataApi: responseApi = {
        ...base.data,
        hierarchy: [
          {
            tags: ['erro'],
            title: '❌ Erros detectados',
          },
          ...base.data.hierarchy,
        ],
      };

      const finalData = dataApi.schema;

      const errorsSchema: SchemaType['blocks'] = [];
      const warningSchema: SchemaType['blocks'] = [];

      finalData.map((item) => {
        item.errors?.forEach((item2) => {
          errorsSchema.push({
            markdown: `HANDLER ${item.handlerName} - ${item2}`,
            type: 'md',
            subType: 'normal',
            dynamicId: Math.random().toString(),
          });
        });
      });

      finalData.map((item) => {
        item.warning?.forEach((item2) => {
          const howResolve = item2.type === 'code-without-language' ? howResolveCodeWithoutLanguage : 'Sem solução';
          warningSchema.push({
            markdown: `HANDLER ${item.handlerName} - ${item2.file}\n\n${howResolve} problemas encontrados nesses pontos \n\n${item2.code
              .map((lineLocal) => {
                return lineLocal
                  .split('\n')
                  .map((itemInside) => {
                    const resolved = JSON.stringify(itemInside);
                    return '    ' + resolved.slice(1, resolved.length - 1) + '  ';
                  })
                  .join('\n');
              })
              .join('\n')}\n\n-------------`,
            type: 'md',
            subType: 'normal',
            dynamicId: Math.random().toString(),
          });
        });
      });

      if (errorsSchema.length) {
        finalData.unshift({
          originName: 'pangeia-reports',
          title: 'Erros no pangeia',
          id: Math.random().toString(),
          handlerName: 'frontend-anomalias-retornadas',
          tags: ['pangeia', 'erro'],
          blocks: [
            {
              dynamicId: Math.random().toString(),
              type: 'md',
              subType: 'normal',
              markdown: '# Esse é um relatório de erros no pangeia, o sistema que extrai as documentações dos projetos',
            },
            ...errorsSchema,
          ],
        });
      }

      if (warningSchema.length) {
        finalData.unshift({
          originName: 'pangeia-warnings',
          title: 'Alertas no pangeia',
          id: Math.random().toString(),
          handlerName: 'frontend-anomalias-retornadas',
          tags: ['pangeia', 'erro'],
          blocks: [
            {
              dynamicId: Math.random().toString(),
              type: 'md',
              subType: 'normal',
              markdown: '# Esse é um relatório alertas do midguard',
            },
            ...warningSchema,
          ],
        });
      }

      const errors: SchemaType['blocks'] = [];
      finalData.forEach((item) => {
        item.blocks.forEach((itemLocal) => {
          const references = extractReferences('markdown' in itemLocal ? itemLocal.markdown || '' : '');
          references.forEach((itemReference) => {
            if (itemReference.type === 'reference') {
              const docByTagFounded = findDocByTags(finalData, itemReference.reference.split('.'));
              if (!docByTagFounded) {
                errors.push({
                  dynamicId: Math.random().toString(),
                  type: 'md',
                  subType: 'normal',
                  markdown: `- ❌ [${item.originName}] Erro ao analisar "${item.title}"  com tags "${item.tags?.join('.')}", a referência "${itemReference.reference}" do conteudo não foi encontrada, e está quebrada`,
                });
              }
            }
          });
        });
      });

      if (errors.length) {
        finalData.unshift({
          originName: 'pangeia-reports',
          title: 'Referências quebradas',
          id: Math.random().toString(),
          tags: ['referencias', 'erro'],
          handlerName: 'frontend-anomalias-referencias',
          blocks: [
            {
              dynamicId: Math.random().toString(),
              type: 'md',
              subType: 'normal',
              markdown:
                '# Esse é um relatório de referências quebradas\n Esses erros são acessos como o ref.algumaCoisa mas que não foi encontrado nenhuma referência para o path usado. Isso acontece por exemplo quando em uma documentação você usa um `ref.algoQueNãoExiste`. Essa pagina irá sumir assim que todas as referências forem resolvidas',
            },
            ...errors,
          ],
        });
      }

      setData({
        schema: finalData,
        hierarchy: dataApi.hierarchy,
      });
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
