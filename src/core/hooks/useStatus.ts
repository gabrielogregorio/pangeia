import { useState } from 'react';

export const useStatus = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setErrorMessage] = useState<string>('');

  const startFetch = () => {
    setIsLoading(false);
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
