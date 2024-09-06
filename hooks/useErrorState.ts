import { useState } from 'react';

export default function useErrorState(
  initialState = {
    massage: '',
    isError: false,
  },
) {
  const [errorState, setError] = useState(initialState);

  return {
    message: errorState.massage,
    isError: errorState.isError,
    setError,
    reset: () =>
      setError({
        massage: '',
        isError: false,
      }),
  };
}
