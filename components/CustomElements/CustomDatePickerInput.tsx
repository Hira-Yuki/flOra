import { forwardRef } from 'react';

interface DatePickerInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomDatePickerInput = forwardRef<
  HTMLButtonElement,
  DatePickerInputProps
>(function CustomDatePickerInput({ value, onClick }, ref) {
  return (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="bg-white rounded-md"
    >
      {value}
    </button>
  );
});

CustomDatePickerInput.displayName = 'CustomDatePickerInput'; // displayName 설정

export default CustomDatePickerInput;
