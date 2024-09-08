'use client';

import { useState } from 'react';

export default function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-screen flex">
      {/* 사이드바 */}
      <div
        className={`h-full w-24 bg-gray-300 fixed md:static md:flex flex-col items-center pt-6 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 hidden md:flex`}
      >
        <ul className="flex flex-col gap-10 h-full text-white">
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center">
            홈
          </li>
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center">
            캘린더
          </li>
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center">
            타이머
          </li>
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center">
            플로라
          </li>
          <li className="w-14 h-14 bg-gray-500 text-center flex items-center justify-center mt-auto mb-6">
            프로필
          </li>
        </ul>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col ml-0">
        {/* 헤더 */}
        <div className="h-24 w-full py-8 flex items-center justify-between">
          <h2 className="ml-8 text-4xl">Dashboard</h2>

          {/* 햄버거 버튼 */}
          <button className="md:hidden p-2" onClick={toggleSidebar}>
            {/* 햄버거 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-4">내용 : 몬가... 한다...</div>
      </div>

      {/* 오버레이 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
