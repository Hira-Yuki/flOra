'use client';

import AddIcon from '@components/icons/AddIcon';
import EllipsisIcon from '@components/icons/EllipsisIcon';
import WidgetHeader from '@components/widgetElements/WidgetHeader';
import WidgetWrapper from '@components/widgetElements/WidgetWrapper';
import { useInput, useToggle } from '@hooks';
import { motivationAPI } from '@lib/api/motivation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export default function MotivationWidget() {
  const input = useInput('');
  const isEdit = useToggle(false);
  const isOpenMenu = useToggle(false);
  const textAreaRef = useRef(null);
  const toggleMenu = () => isOpenMenu.toggleValue();
  const closeMenu = () => isOpenMenu.setFalse();
  const isModify = useToggle(false);

  // 텍스트에 따라 textarea의 높이를 조정하는 함수
  const adjustTextareaHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 높이를 자동으로 조정
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞게 높이 설정
    }
  };

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
      isEdit.setFalse();
      isModify.setFalse();
      handleSave();
    }
  };

  // textarea가 포커스될 때 커서를 텍스트 끝으로 이동시키는 함수
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length); // 커서를 텍스트 끝으로 이동
  };

  const activeModify = () => {
    isModify.setTrue();
    activateEditMode();
  };

  // 편집 모드를 활성화하고 textarea에 포커스를 주는 함수
  const activateEditMode = () => {
    isEdit.setTrue();
    closeMenu();
    setTimeout(() => {
      textAreaRef.current?.focus(); // textarea가 활성화되면 자동으로 포커스를 줌
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isEdit.setFalse(); // 엔터 시 편집 모드 종료
    handleSave();
  };

  const handleSave = async () => {
    try {
      // do something...
      const form = { content: input.value };
      if (isModify.value) {
        const { data } = await motivationAPI.modifyMotivation(form);
        toast.success(data);
        isModify.setFalse();
      } else {
        const { data } = await motivationAPI.createMotivation(form);
        toast.success(data);
      }
    } catch (err) {
      // do something...
      console.log(err);
    }
  };

  const handleBlur = () => {
    isEdit.setFalse();
    handleSave();
  };

  const handleDelete = async () => {
    try {
      // Delete ..
      const { data } = await motivationAPI.deleteMotivation();
      toast.success(data);
      input.reset();
    } catch (err) {
      //error handling
      console.log(err);
      toast.error(err.message);
    } finally {
      closeMenu();
    }
  };

  useEffect(() => {
    const getMotivation = async () => {
      try {
        const { data } = await motivationAPI.getMotivation();
        input.setValues(data.content);
      } catch (err) {
        console.log(err);
      }
    };
    getMotivation();
  }, []);

  return (
    <WidgetWrapper>
      <div className=" flex items-center justify-between">
        <WidgetHeader title={'목표/다짐'} />
        {input.value && (
          <EllipsisIcon
            className={'text-mainText w-10 h-10 cursor-pointer z-10'}
            onClick={toggleMenu}
          />
        )}
        {isOpenMenu.value && (
          <div
            className="absolute z-20 top-12 right-4 bg-floraWhite py-2 text-sm font-semibold shadow-lg"
            onMouseLeave={closeMenu}
          >
            <div className="absolute bg-floraWhite w-2 h-2 border-t-1 border-l-1 transform rotate-45 -top-1 right-4 shadow-lg" />
            <ul className="flex flex-col gap-3 w-full py-2 justify-around">
              <li>
                <button
                  type="button"
                  className="cursor-pointer px-8"
                  onClick={activeModify}
                >
                  수정
                </button>
              </li>
              <li>
                <button className="cursor-pointer px-8" onClick={handleDelete}>
                  삭제
                </button>
              </li>
            </ul>
          </div>
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
            className="flex justify-center items-center text-center align-middle bg-floraBeige font-bold w-full text-4xl line-clamp-2 outline-none resize-none enabled:-mt-1 enabled:border-floraYellow enabled:border-2 leading-relaxed"
            disabled={!isEdit.value}
          />
          {isEdit.value === false && input.value === '' && (
            <AddIcon
              className={'w-14 h-14 absolute cursor-pointer'}
              onClick={activateEditMode}
            />
          )}
        </form>
      </div>
    </WidgetWrapper>
  );
}
