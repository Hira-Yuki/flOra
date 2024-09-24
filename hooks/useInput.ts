import { useState } from 'react';

export default function useInput(initialValue: string = '') {
  const [value, setValue] = useState<string>(initialValue);

  // 입력 변경 핸들러
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // 값과 핸들러를 반환
  return {
    value,
    onChange: handleChange,
    reset: () => setValue(initialValue),
  };
}
