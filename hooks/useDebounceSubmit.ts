import { useCallback } from "react";
import { debounce } from "lodash";

type SubmitFunction = (...args: any[]) => Promise<void> | void;

export default function useDebouncedSubmit(
  submitFn: SubmitFunction,
  delay: number = 300
) {
  // 디바운스된 서브밋 함수 정의
  const debouncedSubmit = useCallback(
    debounce(async (...args) => {
      await submitFn(...args);
    }, delay),
    [submitFn, delay]
  );

  return debouncedSubmit;
}
