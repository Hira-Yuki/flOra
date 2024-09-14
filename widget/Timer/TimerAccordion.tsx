import { useState } from 'react';

import AccordionButton from './AccordionButton';

export default function TimerAccordion() {
  const [activeTab, setActiveTab] = useState('study'); // 현재 활성화된 탭 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 아코디언 메뉴 열기/닫기 상태

  // 각 탭에 대한 콘텐츠 데이터
  const menuData = {
    study: [
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
    ],
    studyNonRoutine: [
      'example-todolist - Non-Study',
      'example-todolist - Non-Study',
    ],
    life: [
      'example-todolist - Life-Routine',
      'example-todolist - Life-Routine',
    ],
    lifeNonRoutine: [
      'example-todolist - Non-Life',
      'example-todolist - Non-Life',
    ],
  };

  // 메뉴 클릭 핸들러
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-black font-semibold cursor-pointer"
        >
          example - math 1
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 bg-floraGreen rounded-md shadow-lg p-4 z-10 font-medium max-w-72">
          <div className="flex h-11 space-x-2 overflow-x-auto w-full">
            <AccordionButton
              label="스터디 루틴"
              isActive={activeTab === 'study'}
              onClick={() => handleTabClick('study')}
            />
            <AccordionButton
              label="스터디 비루틴"
              isActive={activeTab === 'studyNonRoutine'}
              onClick={() => handleTabClick('studyNonRoutine')}
            />
            <AccordionButton
              label="라이프 루틴"
              isActive={activeTab === 'life'}
              onClick={() => handleTabClick('life')}
            />
            <AccordionButton
              label="라이프 비루틴"
              isActive={activeTab === 'lifeNonRoutine'}
              onClick={() => handleTabClick('lifeNonRoutine')}
            />
          </div>
          <div className="overflow-y-auto max-h-40 text-white">
            {menuData[activeTab].map((item, index) => (
              <label
                key={`${index}-${item}`}
                className="flex items-center gap-2 cursor-pointer py-1"
              >
                <input type="radio" name="routine" className="cursor-pointer" />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
