import { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext } from '@/contexts/dataProvider';
import { SchemaType } from '@/interfaces/api';
import { ContextItems } from '@/widgets/groupSuits/contextItems';

// enviar para api
const contexts: {
  tags: string[];
  title: string;
}[] = [];

// melhorar isso haha
type hiearquiqueModelType = {
  [key: string]: SchemaType[];
};

const sortByContexts = (data: SchemaType[]): hiearquiqueModelType => {
  let byContexts: { [key: string]: SchemaType[] } = {};
  let semContexto: { [key: string]: SchemaType[] } = {};

  data.forEach((dataBasse) => {
    let foundAnyContext = false;

    contexts.forEach((item) => {
      if (foundAnyContext) {
        return;
      }

      const temTodasAsTags = item.tags.every((tagLocal) => dataBasse.tags?.includes(tagLocal));
      if (temTodasAsTags) {
        if (byContexts[item.title]) {
          byContexts[item.title].push(dataBasse);
        } else {
          byContexts[item.title] = [dataBasse];
        }
        foundAnyContext = true;
      }
    });

    // criar modo de alternancia de hierarquia ou não... se tiver uma só expandir
    if (!foundAnyContext) {
      if (semContexto['Documentação']) {
        semContexto['Documentação'].push(dataBasse);
      } else {
        semContexto['Documentação'] = [dataBasse];
      }
    }
  });

  return { ...byContexts, ...semContexto };
};

export const GroupSuits = ({ filter }: { filter: string }): ReactElement => {
  const { data } = useContext(DataContext);
  const [dataWithContext, setDataWithontext] = useState<hiearquiqueModelType>({});

  useEffect(() => {
    setDataWithontext(sortByContexts(data));
  }, [data]);

  return (
    <div className="">
      {Object.keys(dataWithContext).map((item) => {
        return <ContextItems contextName={item} data={dataWithContext[item]} filter={filter} />;
      })}
    </div>
  );
};
