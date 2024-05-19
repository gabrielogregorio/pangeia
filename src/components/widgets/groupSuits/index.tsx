import { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext } from '@/contexts/dataProvider';
import { SchemaType, responseApi } from '@/interfaces/api';
import { ContextItems } from '@/widgets/groupSuits/contextItems';
import { normalizeStrings } from '@/normalizers/strings';
import { hierarchicalModelType } from '@/widgets/groupSuits/types';

const sortByContexts = (data: responseApi): hierarchicalModelType => {
  const byContexts: { [key: string]: SchemaType[] } = {};
  const withoutContext: { [key: string]: SchemaType[] } = {};

  data.schema.forEach((dataBase) => {
    let foundAnyContext = false;

    data.hierarchy.forEach((item) => {
      if (foundAnyContext) {
        return;
      }

      const hasAllTags = item.tags.every((tagLocal) => dataBase.tags?.includes(tagLocal));
      if (hasAllTags) {
        if (byContexts[item.title]) {
          byContexts[item.title].push(dataBase);
        } else {
          byContexts[item.title] = [dataBase];
        }
        foundAnyContext = true;
      }
    });

    // criar modo de alternancia de hierarquia ou não... se tiver uma só expandir
    if (!foundAnyContext) {
      if (withoutContext['Documentação']) {
        withoutContext['Documentação'].push(dataBase);
      } else {
        withoutContext['Documentação'] = [dataBase];
      }
    }
  });

  return { ...byContexts, ...withoutContext };
};

export const GroupSuits = ({ filter }: { filter: string }): ReactElement => {
  const { data } = useContext(DataContext);
  const [dataWithContext, setDataWithContext] = useState<hierarchicalModelType>({});
  const [dataFiltered, setDataFiltered] = useState<hierarchicalModelType>({});

  useEffect(() => {
    setDataWithContext(sortByContexts(data));
  }, [data]);

  useEffect(() => {
    // move to hook
    const filterNormalized = normalizeStrings(filter);
    const finalDataFiltered: hierarchicalModelType = {};

    setDataFiltered({});
    Object.keys(dataWithContext).map((key) => {
      const dataLocal = dataWithContext[key];

      dataLocal.forEach((groupCase) => {
        const notExistsMatchFilterInRouterOrTexts: boolean =
          !normalizeStrings(groupCase.title).includes(filterNormalized) &&
          !normalizeStrings(groupCase.tags?.join(' ')).includes(filterNormalized) &&
          !normalizeStrings(JSON.stringify(groupCase.blocks)).includes(filterNormalized);

        if (filter !== '' && notExistsMatchFilterInRouterOrTexts) {
          return <div key={groupCase.id} />;
        }

        if (key in finalDataFiltered) {
          finalDataFiltered[key].push(groupCase);
        } else {
          finalDataFiltered[key] = [groupCase];
        }
      });
    });

    setDataFiltered(finalDataFiltered);
  }, [filter, dataWithContext]);

  return (
    <div>
      {data.hierarchy.map((key) => {
        const items = dataFiltered[key.title];
        if (items) {
          return <ContextItems contextName={key.title} key={key.title} data={dataFiltered[key.title]} />;
        }

        return <div key={key.title}>Hiearquia desconhecida - {JSON.stringify(key)}</div>;
      })}
    </div>
  );
};
