import { useState } from 'react';

export const useStatus = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setErrorMessage] = useState<string>('');

  const startFetch = () => {
    setIsLoading(true);
    setErrorMessage('');
  };

  return {
    error,
    setErrorMessage,
    startFetch,
    isLoading,
    setIsLoading,
  };
};
