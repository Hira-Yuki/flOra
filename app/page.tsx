import { ROUTE_LISTS } from '@constants';
import Link from 'next/link';

export default function Home() {
  // KAKAO...
  // const AUTHORIZATION_CODE: string = new URL(
  //   document.location.toString(),
  // ).searchParams.get('code') as string;
  // console.log(AUTHORIZATION_CODE);

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen h-screen">
      <h2 className="text-2xl font-bold">테스트 모드...</h2>
      <Link
        href={ROUTE_LISTS.dashBoard}
        type="button"
        className="rounded bg-floraGreen p-4 text-white"
      >
        대시보드로 가기
      </Link>
      <Link
        href={ROUTE_LISTS.signIn}
        type="button"
        className="rounded bg-floraGreen p-4 text-white"
      >
        로그인 화면으로 가기
      </Link>
    </div>
  );
}
