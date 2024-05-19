/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { ReactElement, useEffect, useState } from 'react';
import { handlerRequestType } from '@/interfaces/api';
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
  contentRequest: handlerRequestType;
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

export const RequestHandler = ({ contentRequest }: Props): ReactElement => {
  const { control, setValue, watch } = useRegisterRequestHandler();
  const rows = watch('payload')?.split('\n')?.length || DEFAULT_ROWS_TEXT_AREA;
  const { isLoading, setIsLoading, startFetch } = useStatus();
  const [response, setResponse] = useState(initialState);

  const rowsHeaders = watch('headers')?.split('\n')?.length || DEFAULT_ROWS_TEXT_AREA;

  const reset = () => {
    setValue('url', contentRequest.url);
    setValue('method', contentRequest.method);
    setValue('payload', contentRequest.payload);
    setValue('headers', objectToStringOrEmptyObject(contentRequest.headers));
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
      console.log(error.response?.data, 'xtp');
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
      data: `Erro no YGGDRASIL, esse método "${method}" não é suportado! para fazer requests`,
      dataType: 'json',
      status: '',
    });
  };

  const payloadIsValid = watch('payload') ? convertStringToObject(watch('payload')) !== null : true;
  const headerIsValid = watch('headers') ? convertStringToObject(watch('headers')) !== null : true;

  const isUpdated =
    watch('url') !== contentRequest.url ||
    watch('method') !== contentRequest.method ||
    watch('payload') !== contentRequest.payload ||
    watch('headers') !== objectToStringOrEmptyObject(contentRequest.headers);

  return (
    <div key={contentRequest.dynamicId}>
      {isUpdated ? (
        <div>
          <div>Os dados da request foram alterados!</div>
          <button
            type="button"
            className="bg-primary-700 text-white px-3 py-2 rounded-md flex items-center gap-3"
            onClick={() => reset()}>
            <GrPowerReset /> Resetar
          </button>
        </div>
      ) : undefined}

      <div className="flex gap-4 items-center justify-center">
        <DropDown control={control} name="method" data={dataMethod} className="" defaultValue={contentRequest.method} />

        <Input<IRequestFields> control={control} name="url" className="flex-1" />
      </div>
      <div>
        <h1>Payload</h1>
        {payloadIsValid ? <div></div> : <div>Payload é inválido</div>}
        <TextArea
          className="font-mono"
          name="payload"
          control={control}
          defaultValue={contentRequest.payload}
          rows={rows}
        />
      </div>

      <div>
        <h1>headers</h1>
        {headerIsValid ? <div></div> : <div>Payload é inválido</div>}
        <TextArea
          className="font-mono"
          name="headers"
          control={control}
          defaultValue={objectToStringOrEmptyObject(contentRequest.headers)}
          rows={rowsHeaders}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() => makeRequest()}
          disabled={!headerIsValid || !payloadIsValid}
          aria-label="Fazer request"
          className="bg-primary-500 dark:bg-primary-600 text-white-smooth px-3 py-2 rounded-md flex gap-4">
          Fazer request
          <IoIosSend />
        </button>
      </div>

      {response.status || response.data ? (
        <div>
          <div className="flex gap-4">
            <div>Status</div>

            <div>{response.status ? <div>{response.status}</div> : undefined}</div>
          </div>

          {response.data ? (
            <MarkdownToHtml
              mode={ModeTypeEnum.dev}
              body={'```' + response.dataType + '\n' + response.data + '\n```'}></MarkdownToHtml>
          ) : undefined}
        </div>
      ) : undefined}

      <Status error="" isLoading={isLoading} />
    </div>
  );
};
