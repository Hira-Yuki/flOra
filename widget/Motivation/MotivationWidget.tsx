'use client';

import AddIcon from '@components/icons/AddIcon';
import EllipsisIcon from '@components/icons/EllipsisIcon';
import { useInput } from '@hooks';
import { useRef, useState } from 'react';

export default function MotivationWidget() {
  const input = useInput();
  const [isEdit, setIsEdit] = useState(false);
  const textAreaRef = useRef(null); // textarea를 참조하기 위한 useRef

  // 텍스트가 2줄 이상이 되지 않도록 제어하는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const lines = value.split('\n');
    if (lines.length <= 2) {
      input.onChange(e);
      adjustTextareaHeight(); // 텍스트가 변경될 때마다 높이 조정
    }
  };

  // 줄바꿈과 엔터 동작 제어
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 기본 줄바꿈 방지
      setIsEdit(false); // 편집 모드 종료
    }
  };

  // textarea가 포커스될 때 커서를 텍스트 끝으로 이동시키는 함수
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length); // 커서를 텍스트 끝으로 이동
  };

  // 편집 모드를 활성화하고 textarea에 포커스를 주는 함수
  const activateEditMode = () => {
    setIsEdit(true);
    setTimeout(() => {
      textAreaRef.current?.focus(); // textarea가 활성화되면 자동으로 포커스를 줌
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEdit(false); // 엔터 시 편집 모드 종료
    handleSave();
  };

  // 텍스트에 따라 textarea의 높이를 조정하는 함수
  const adjustTextareaHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 높이를 자동으로 조정
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞게 높이 설정
    }
  };

  const handleSave = async () => {
    try {
      // do something...
    } catch (err) {
      // do something...
      console.log(err);
    }
  };

  const handleBlur = () => {
    setIsEdit(false);
    handleSave();
  };

  return (
    <div className="bg-floraBeige rounded-2xl p-4 w-full max-w-[868px] h-[300px] text-mainText shadow-gray-200 shadow-lg relative">
      <div className=" flex items-center justify-between">
        <h3 className="font-semibold text-lg sm:text-xl ml-2 text-floraOlive h-10 z-10">
          목표/다짐
        </h3>
        {input.value && (
          <EllipsisIcon
            className={'text-mainText w-10 h-10 cursor-pointer z-10'}
            onClick={activateEditMode}
          />
        )}
      </div>
      <div className="flex h-full">
        <form
          className="flex h-full w-full relative -top-10 justify-center items-center content-center"
          onSubmit={handleSubmit}
        >
          <textarea
            ref={textAreaRef} // ref로 textarea 연결
            value={input.value}
            onChange={handleInputChange}
            rows={1}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="bg-floraBeige font-bold w-full text-4xl line-clamp-2 outline-none resize-none  enabled:-mt-1 enabled:border-floraYellow enabled:border-2 text-center leading-relaxed"
            style={{
              display: 'flex',
              justifyItems: 'center',
              alignItems: 'center',
              textAlign: 'center',
              verticalAlign: 'middle',
            }}
            disabled={!isEdit}
          />
          {isEdit === false && input.value === '' ? (
            <AddIcon
              className={'w-14 h-14 absolute cursor-pointer'}
              onClick={activateEditMode}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}
