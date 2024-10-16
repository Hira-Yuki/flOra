export default function SignInSNSButtons({ kakaoAuth }) {
  return (
    <ul className="flex items-center justify-around w-full">
      {/* 카카오 */}
      <li
        className="w-8 h-8 sm:w-16 sm:h-16 lg:w-8 lg:h-8 bg-gray-400 rounded-full"
        onClick={kakaoAuth}
      />
      <li className="w-8 h-8 sm:w-16 sm:h-16 lg:w-8 lg:h-8 bg-gray-400 rounded-full" />
      <li className="w-8 h-8 sm:w-16 sm:h-16 lg:w-8 lg:h-8 bg-gray-400 rounded-full" />
      <li className="w-8 h-8 sm:w-16 sm:h-16 lg:w-8 lg:h-8 bg-gray-400 rounded-full" />
    </ul>
  );
}
