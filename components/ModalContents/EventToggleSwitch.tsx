interface CustomRadioToggleProps {
  selectedOption: string; // 선택된 옵션
  onChange: (value: string) => void; // 옵션이 변경될 때 실행될 함수
}

export default function EventToggleSwitch({
  selectedOption,
  onChange,
}: CustomRadioToggleProps) {
  const handleOptionChange = (event) => {
    onChange(event.target.value); // 부모 컴포넌트로 선택된 값을 전달
  };
  const options = [
    { value: 'event', label: '이벤트' },
    { value: 'todo', label: '투두' },
  ];

  return (
    <div className="flex pl-1 gap-3 text-mainText font-medium">
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name="menu"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            className="sr-only" // 화면에서 숨김
          />
          <label
            htmlFor={option.value}
            className={`w-[90px] h-[34px] border rounded-badge flex items-center justify-center cursor-pointer transition-colors ${selectedOption === option.value ? 'border-floraYellow bg-floraYellow' : 'border-objectGray'}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
