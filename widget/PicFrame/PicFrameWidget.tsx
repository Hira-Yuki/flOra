'use client';

import AddIcon from '@components/icons/AddIcon';
import EllipsisIcon from '@components/icons/EllipsisIcon';
import WidgetHeader from '@components/widgetElements/WidgetHeader';
import WidgetWrapper from '@components/widgetElements/WidgetWrapper';
import { useToggle } from '@hooks';
import { useRef, useState } from 'react';

export default function PicFrameWidget() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const isOpenMenu = useToggle(false);

  const toggleMenu = () => isOpenMenu.toggleValue();
  const closeMenu = () => isOpenMenu.setFalse();

  const handleAdd = () => {
    fileInputRef.current?.click();
  };

  // 파일 변경 시 처리하는 함수
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      // 추가적으로 업로드할 로직을 여기에 추가할 수 있습니다.
    }
  };

  // 수정 클릭시 실행할 기능
  const handleImageClick = () => {
    fileInputRef.current?.click(); // 파일 입력 다시 열기
  };

  const handleDelete = () => {
    setUploadedImage(null); // 이미지 삭제
    try {
      //do something
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WidgetWrapper>
      <div className="flex flex-col h-full">
        <div className="flex justify-between relative">
          <WidgetHeader title={'이미지'} />
          {uploadedImage && (
            <EllipsisIcon
              className={'text-mainText w-10 h-10 cursor-pointer z-10'}
              onClick={toggleMenu}
            />
          )}
          {isOpenMenu.value && (
            <div
              className="absolute z-20 top-7 -right-5 bg-floraWhite py-2 text-sm font-semibold shadow-lg"
              onMouseLeave={closeMenu}
            >
              <ul className="flex flex-col gap-3 w-full py-2 justify-around">
                <li>
                  <button
                    type="button"
                    className="cursor-pointer px-8"
                    onClick={handleImageClick}
                  >
                    수정
                  </button>
                </li>
                <li>
                  <button
                    className="cursor-pointer px-8"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-center items-center overflow-hidden">
          {/* 이미지가 없을 때만 AddIcon을 보여줌 */}
          {!uploadedImage && (
            <AddIcon
              className="w-14 h-14 relative -top-3 cursor-pointer"
              onClick={handleAdd}
            />
          )}
          {/* 업로드된 이미지가 있다면 이미지가 표시됨 */}
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-full object-contain rounded-lg"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </WidgetWrapper>
  );
}
