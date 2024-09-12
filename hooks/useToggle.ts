import { useState } from 'react';

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggleValue = () => setValue((prev) => !prev);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggleValue, setTrue, setFalse };
}
