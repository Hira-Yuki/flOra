import { useState } from 'react';

export default function useErrorState(
  initialState = {
    message: '',
    isError: false,
  },
) {
  const [errorState, setError] = useState(initialState);

  return {
    message: errorState.message,
    isError: errorState.isError,
    setError,
    reset: () =>
      setError({
        message: '',
        isError: false,
      }),
  };
}
