/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { ReactElement, useEffect, useState } from 'react';
import { swaggerRequestType } from '@/interfaces/api';
import { IRequestFields, useRegisterRequestHandler } from '@/widgets/documentation/useRegisterRequestHandler';
import { Input } from '@/components/base/input';
import { DropDown, dataDropDownType } from '@/components/base/dropdown';
import { TextArea } from '@/components/base/TextArea';
import { convertStringToObject } from '@/components/base/convertStringToObject';
import { IoIosSend } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import axios, { AxiosError } from 'axios';
import { useStatus } from '@/hooks/useStatus';
import { MarkdownToHtml } from '@/shared/ReactMarkdown';
import { ModeTypeEnum } from '@/contexts/types';
import { Status } from '@/components/base/Status';
import { InterpreterMarkdown } from '@/components/interpreterMarkdown';
import { AiFillCloseCircle } from 'react-icons/ai';
import { PiBracketsCurlyThin } from 'react-icons/pi';
import { messageByStatusCode } from '@/widgets/documentation/messageByStatusCode';
import { MenuScenaries } from '@/widgets/documentation/MenuScenaries';

const dataMethod: dataDropDownType[] = [
  { value: 'GET', children: 'GET' },
  // { value: 'HEAD', children: 'HEAD' },
  { value: 'POST', children: 'POST' },
  { value: 'PUT', children: 'PUT' },
  { value: 'DELETE', children: 'DELETE' },
  // { value: 'CONNECT', children: 'CONNECT' },
  { value: 'OPTIONS', children: 'OPTIONS' },
  // { value: 'TRACE', children: 'TRACE' },
  { value: 'PATCH', children: 'PATCH' },
];

type Props = {
  contentRequest: swaggerRequestType;
};

const DEFAULT_ROWS_TEXT_AREA = 3;
const DEFAULT_FORMAT_SPACES_JSON = 2;
const objectToStringOrEmptyObject = (content: object | null | undefined) => {
  return Object.keys(content || {}) ? JSON.stringify(content, undefined, DEFAULT_FORMAT_SPACES_JSON) : '{\n}';
};

const initialState = {
  data: '',
  dataType: 'json' as 'html' | 'json' | 'text',
  status: '',
};

const defaultStatusError = 'Erro, sem status (pode ser CORS ou problemas similares, verifique o dev tools)';

const RequestHandlerChildren = ({
  contentRequest,
  scenerie,
}: {
  contentRequest: Exclude<swaggerRequestType, 'sceneries'>;
  scenerie: swaggerRequestType['sceneries'][0];
}): ReactElement => {
  const { control, setValue, watch } = useRegisterRequestHandler();
  const rows = watch('payload')?.split('\n')?.length || DEFAULT_ROWS_TEXT_AREA;
  const { isLoading, setIsLoading, startFetch } = useStatus();
  const [response, setResponse] = useState(initialState);

  const rowsHeaders = watch('headers')?.split('\n')?.length || DEFAULT_ROWS_TEXT_AREA;

  const reset = () => {
    setValue('url', contentRequest.url);
    setValue('method', contentRequest.method);
    setValue(
      'payload',
      typeof scenerie.payload === 'string' ? scenerie.payload : JSON.stringify(scenerie.payload, undefined, 4),
    );
    setValue('headers', objectToStringOrEmptyObject(scenerie.headers));
    setResponse(initialState);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRequest.url]);

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (String(error.response?.data).toLowerCase().startsWith('<!doctype html>')) {
        setResponse({
          data: String(error.response?.data),
          dataType: 'html',
          status: error.response?.status?.toString() || defaultStatusError,
        });

        return;
      }
      setResponse({
        data: objectToStringOrEmptyObject(error.response?.data),
        dataType: 'json',
        status: error.response?.status?.toString() || defaultStatusError,
      });
      return;
    }

    console.log('PUSTS');
    setResponse({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: error?.message || 'Erro desconhecido',
      dataType: 'html',
      status: defaultStatusError,
    });
  };

  const makeRequest = () => {
    startFetch();
    setResponse(initialState);

    // this is very bad
    const method = watch('method').toLowerCase();
    const payload = watch('payload') ? convertStringToObject(watch('payload')) || {} : undefined;
    const headers = watch('headers') ? convertStringToObject(watch('headers')) || {} : undefined;
    if (method === 'post' || method === 'put' || method === 'patch') {
      axios[method](watch('url'), payload, headers)
        .then((res) => {
          const isHtml = String(res.data).toLowerCase().startsWith('<!doctype html>');

          setResponse({
            data: isHtml ? String(res.data) : JSON.stringify(res.data, undefined, DEFAULT_FORMAT_SPACES_JSON),
            dataType: isHtml ? 'html' : 'json',
            status: res.status.toString(),
          });
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      return;
    }

    if (method === 'get' || method === 'options' || method === 'delete') {
      axios[method](watch('url'), headers)
        .then((res) => {
          const isHtml = String(res.data).toLowerCase().startsWith('<!doctype html>');

          setResponse({
            data: isHtml ? String(res.data) : JSON.stringify(res.data, undefined, DEFAULT_FORMAT_SPACES_JSON),
            dataType: isHtml ? 'html' : 'json',
            status: res.status.toString(),
          });
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      return;
    }

    setResponse({
      data: `Erro no pangeia, esse método "${method}" não é suportado! para fazer requests`,
      dataType: 'json',
      status: '',
    });
  };

  const payloadIsValid = watch('payload') ? convertStringToObject(watch('payload')) !== null : true;
  const headerIsValid = watch('headers') ? convertStringToObject(watch('headers')) !== null : true;

  const isUpdated =
    watch('url') !== contentRequest.url ||
    watch('method') !== contentRequest.method ||
    watch('payload') !== scenerie.payload ||
    watch('headers') !== objectToStringOrEmptyObject(scenerie.headers);

  return (
    <div key={contentRequest.dynamicId} className="min-h-[150vh]">
      {isUpdated ? (
        <div className="min-h-[2.5rem]">
          <button
            key="isUpdated"
            type="button"
            className="bg-primary-700 text-white px-3 py-2 rounded-md flex items-center gap-3 animate-fadeInSpeed"
            onClick={() => reset()}>
            <div>Os dados da request foram alterados!</div>
            <GrPowerReset /> Resetar
          </button>
        </div>
      ) : (
        <div className="min-h-[2.5rem]"></div>
      )}
      <div className="flex gap-4 items-center justify-center">
        <DropDown control={control} name="method" data={dataMethod} className="" defaultValue={contentRequest.method} />

        <Input<IRequestFields> control={control} name="url" className="flex-1" />
      </div>
      <div>
        <h1>Payload</h1>
        {payloadIsValid ? <div></div> : <div>Payload é inválido</div>}
        <TextArea className="font-mono" name="payload" control={control} defaultValue={scenerie.payload} rows={rows} />
      </div>
      <div>
        <h1>headers</h1>
        {headerIsValid ? <div></div> : <div>Payload é inválido</div>}
        <TextArea
          className="font-mono"
          name="headers"
          control={control}
          defaultValue={objectToStringOrEmptyObject(scenerie.headers)}
          rows={rowsHeaders}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => makeRequest()}
          disabled={!headerIsValid || !payloadIsValid}
          aria-label="Fazer request"
          className="bg-primary-500 dark:bg-primary-600 text-white-smooth px-3 py-2 rounded-md flex gap-4 mt-4 items-center justify-center">
          Fazer request
          <IoIosSend />
        </button>

        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert('Feature não está pronta');
          }}
          disabled={!headerIsValid || !payloadIsValid}
          aria-label="Copiar curl"
          className="bg-primary-500 dark:bg-primary-600 text-white-smooth px-3 py-2 rounded-md flex gap-4 mt-4 items-center justify-center">
          Copiar Curl
          <PiBracketsCurlyThin />
        </button>
      </div>
      {response.status || response.data ? (
        <div
          className="bg-primary border-2 border-primary-500 mt-4 py-2 rounded-md animate-fadeInSpeed"
          key="response-status">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-4 px-4">
              <div>Status</div>

              <div>
                {response.status ? (
                  <div>
                    {response.status} {messageByStatusCode[Number(response.status) || 0] || ''}
                  </div>
                ) : undefined}
              </div>
            </div>

            <button
              type="button"
              className="px-6 py-4"
              onClick={() => {
                setResponse(initialState);
              }}>
              <AiFillCloseCircle className="min-w-[2rem] text-2xl" />
            </button>
          </div>
          {response.data ? (
            <MarkdownToHtml
              mode={ModeTypeEnum.dev}
              body={'```' + response.dataType + '\n' + response.data + '\n```'}></MarkdownToHtml>
          ) : undefined}
        </div>
      ) : undefined}

      {scenerie?.description ? <InterpreterMarkdown text={scenerie?.description} /> : null}

      {scenerie?.description ? (
        <InterpreterMarkdown text={`\n\`\`\`json\n${JSON.stringify(scenerie.payload, undefined, 4)} `} />
      ) : null}

      <Status error="" isLoading={isLoading} />

      <div className="min-h-[200px]"></div>
    </div>
  );
};

export const RequestHandler = ({ contentRequest }: Props): ReactElement => {
  const [selectedResponse, setSelectedResponse] = useState<swaggerRequestType['sceneries'][0] | undefined>(
    contentRequest['sceneries'][0] || undefined,
  );

  const shouldIgnoreScenaries =
    contentRequest.sceneries.length === 1 && contentRequest.sceneries[0].response.status === 0;
  return (
    <div key={contentRequest.dynamicId}>
      {!shouldIgnoreScenaries &&
        contentRequest.sceneries.map((test, index: number) => {
          return (
            <MenuScenaries
              key={`${test.description}-${test.summary}-${index}`}
              isSelected={selectedResponse?.response.status === test.response.status}
              text={test.response.status}
              onClick={(): void => setSelectedResponse(test)}
            />
          );
        })}

      {selectedResponse ? (
        <RequestHandlerChildren
          key={selectedResponse.response.status}
          scenerie={selectedResponse}
          contentRequest={contentRequest}
        />
      ) : undefined}
    </div>
  );
};
