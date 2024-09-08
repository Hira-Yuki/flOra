export default function DashBoard() {
  return (
    <div className="h-screen w-screen relative">
      <div className="h-screen w-24 bg-green-500 absolute flex flex-col items-center pt-4">
        <ul className="flex flex-col gap-10 h-full">
          <li className="w-14 h-14 bg-gray-600 text-center flex items-center justify-center">
            홈
          </li>
          <li className="w-14 h-14 bg-gray-600 text-center flex items-center justify-center">
            캘린더
          </li>
          <li className="w-14 h-14 bg-gray-600 text-center flex items-center justify-center">
            타이머
          </li>
          <li className="w-14 h-14 bg-gray-600 text-center flex items-center justify-center">
            플로라
          </li>
          <li className="w-14 h-14 bg-gray-600 text-center flex items-center justify-center mt-auto mb-10">
            프로필
          </li>
        </ul>
      </div>
      <div className="h-24 w-full pl-24 bg-red-500">
        <h2>header</h2>
      </div>
    </div>
  );
}
