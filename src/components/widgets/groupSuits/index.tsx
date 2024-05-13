import { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext } from '@/contexts/dataProvider';
import { SchemaType, responseApi } from '@/interfaces/api';
import { ContextItems } from '@/widgets/groupSuits/contextItems';

// melhorar isso haha
type hierarchicalModelType = {
  [key: string]: SchemaType[];
};

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

  useEffect(() => {
    setDataWithContext(sortByContexts(data));
  }, [data]);

  return (
    <div className="">
      {Object.keys(dataWithContext).map((key) => {
        return <ContextItems contextName={key} key={key} data={dataWithContext[key]} filter={filter} />;
      })}
    </div>
  );
};
