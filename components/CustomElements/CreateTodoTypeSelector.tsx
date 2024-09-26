import { useEffect, useId, useState } from 'react';

export default function CreateTodoTypeSelector({ value, onChange }) {
  const idPrefix = useId(); // 공통 접두사로 고유한 ID 생성
  const [selectedType, setSelectedType] = useState(value || 'indexRed');

  const typeOptions = [
    {
      id: `${idPrefix}-studyRoutine`,
      label: '스터디 루틴',
      value: 'studyRoutine',
    },
    { id: `${idPrefix}-study`, label: '스터디 비루틴', value: 'study' },
    {
      id: `${idPrefix}-lifeRoutine`,
      label: '라이프 루틴',
      value: 'lifeRoutine',
    },
    { id: `${idPrefix}-life`, label: '라이프 비루틴', value: 'life' },
  ];

  const onChangeHandler = ({ target }) => {
    setSelectedType(target.value);
  };

  // 선택된 색상이 바뀔 때 부모에게 값 전달
  useEffect(() => {
    onChange(selectedType);
  }, [selectedType]);

  return (
    <div className="flex gap-4">
      <label className="cursor-pointer text-right ml-3 text-descText">
        투두목록
      </label>
      <div className="grid grid-cols-2 grid-rows-2 mb-6">
        {typeOptions.map(({ id, label, value: optionValue }) => (
          <div key={id} className="col-span-1 row-span-1 gap-1 mb-3">
            <input
              id={id}
              type="radio"
              name="createType"
              value={optionValue}
              checked={selectedType === optionValue}
              onChange={onChangeHandler}
            />
            <label htmlFor={id} className="cursor-pointer text-right ml-3">
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
