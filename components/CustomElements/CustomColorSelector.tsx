import { useEffect, useId, useState } from 'react';

export default function CustomColorSelector({ label, indexColor, onChange }) {
  const idPrefix = useId(); // 공통 접두사로 고유한 ID 생성
  const colorOptions = [
    { id: `${idPrefix}-red`, value: 'indexRed', color: 'bg-indexRed' },
    { id: `${idPrefix}-yellow`, value: 'indexYellow', color: 'bg-indexYellow' },
    { id: `${idPrefix}-green`, value: 'indexGreen', color: 'bg-indexGreen' },
    { id: `${idPrefix}-cyan`, value: 'indexCyan', color: 'bg-indexCyan' },
    {
      id: `${idPrefix}-lavender`,
      value: 'indexLavender',
      color: 'bg-indexLavender',
    },
  ];

  const [selectedColor, setSelectedColor] = useState(indexColor || 'indexRed');

  const onChangeHandler = ({ target }) => {
    setSelectedColor(target.value);
  };

  // 선택된 색상이 바뀔 때 부모에게 값 전달
  useEffect(() => {
    onChange(selectedColor);
  }, [selectedColor]);

  return (
    <div className="flex items-center gap-4 mb-6">
      <label className="text-right ml-3 w-14 text-descText">{label}</label>
      <fieldset className="flex gap-4">
        {colorOptions.map(({ id, value, color }) => (
          <div key={id}>
            <input
              id={id}
              type="radio"
              name="index-color"
              value={value}
              className="sr-only peer"
              checked={selectedColor === value}
              onChange={onChangeHandler}
            />
            <ColorLabel peerId={id} color={color} />
          </div>
        ))}
      </fieldset>
    </div>
  );
}

const ColorLabel = ({ peerId, color }) => {
  return (
    <label
      htmlFor={peerId}
      className={`relative block w-6 h-6 rounded-full peer-checked:before:content-['✓'] peer-checked:before:absolute before:right-[5px] before:text-white ${color}`}
    />
  );
};
